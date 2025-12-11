import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { openInvoice } from '@telegram-apps/sdk-react';
import { useShallow } from 'zustand/shallow';

import { PRODUCT_EVENTS } from '@/entities/product';

import { PRODUCT_TYPE } from '@/shared/model/constants';
import type { BuyedProduct, Product } from '@/shared/model/types';
import { useSocket } from '@/shared/providers/socket/context';

import { storeApi } from '../api';

import { STORE_EVENTS } from './constants';
import type { Store } from './types';

export const useStore = () => {
    const [store, setStore] = useState<Store>(null!);
    
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isRefetching, setIsRefetching] = useState(false);

    const [processingIds, setProcessingIds] = useState<Array<string>>([]);

    const { socket, isConnected } = useSocket(useShallow((state) => state));

    const subscribers = useRef<Set<(event: string, _id: string) => void>>(new Set());

    const isStoreEmpty = useMemo(() => (store ? Object.values(store).every((products) => !products.length) : !isLoading && !isError), [isLoading, isError, store]);

    useEffect(() => {
        fetchStore('init');

        socket.on(STORE_EVENTS.PRODUCT_BUY, ({ buyedProduct, newProduct, recalculatedPrices }: { buyedProduct: BuyedProduct, newProduct?: Product, recalculatedPrices?: Record<string, number> }) => {
            const key = PRODUCT_TYPE[buyedProduct.type];

            setStore((prevState) => {
                if (recalculatedPrices) {
                    const nextState: any = {};
                    
                    Object.entries(prevState).forEach(([key, products]) => {
                        nextState[key] = products.map((product) => {
                            const newPrice = recalculatedPrices[product.slug];
                            
                            if (product._id === buyedProduct._id) {
                                return key === 'LADDER' && newProduct ? newProduct : { ...product, canBuy: false, payedAt: buyedProduct.payedAt }
                            }
                            
                            return newPrice ? { ...product, price: newPrice } : product;
                        })
                    })
                    
                    return nextState;
                } else {
                    return {
                        ...prevState,
                        [key]: prevState[key]?.map((product) => {
                            return product._id === buyedProduct._id ? key === 'LADDER' && newProduct ? newProduct : { ...product, canBuy: false, payedAt: buyedProduct.payedAt } : product;
                        })
                    };
                }
            });
            
            setProcessingIds((prev) => prev.filter((id) => id !== buyedProduct._id));

            subscribers.current.forEach((subscriber) => subscriber(PRODUCT_EVENTS.PRODUCT_BUY, buyedProduct._id));
        });

        return () => {
            socket.off(STORE_EVENTS.PRODUCT_BUY);
        };
    }, []);

    const subscribe = (subscriber: (event: string, _id: string) => void) => {
        subscribers.current.add(subscriber);

        return () => subscribers.current.delete(subscriber);
    }

    const onDailyTimerExpired = (_id: string) => {
        setStore((prev) => ({
            ...prev,
            DAILY: prev.DAILY.map((p) => p._id === _id ? { ...p, canBuy: true } : p)
        }))
    }

    const fetchStore = useCallback(async (action: 'init' | 'refetch', signal?: AbortSignal) => {
        try {
            action === 'init' ? setIsLoading(true) : setIsRefetching(true);

            const { data } = await storeApi.get(signal);

            setStore(data.products.reduce<Store>((acc, product) => {
                const key = PRODUCT_TYPE[product.type];

                return {
                    ...acc,
                    [key]: acc?.[key] ? [...acc[key], product] : [product]
                };
            }, null!));
            
            setIsError(false);
        } catch (error) {
            setIsError(true);
        } finally {
            setIsLoading(false);
            setIsRefetching(false);
        }
    }, []);

    const handleBuyProduct = async (product: Product) => {
        try {
            setProcessingIds((prev) => [...prev, product._id]);

            const { data } = await storeApi.getInvoice(product._id);

            const status = await openInvoice(data, 'url');

            if (status === 'paid') {
            } else {
                setProcessingIds((prev) => prev.filter((id) => id !== product._id));
            }
        } catch (error) {
            console.error(error);
            setProcessingIds((prev) => prev.filter((id) => id !== product._id));
        }
    }

    return {
        store,
        isError,
        isStoreEmpty,
        processingIds,
        isRefetching,
        isLoading,
        subscribe,
        handleBuyProduct,
        onDailyTimerExpired,
        refetch: () => fetchStore('refetch')
    };
};