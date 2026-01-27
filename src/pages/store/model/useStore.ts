import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { openInvoice } from '@telegram-apps/sdk-react';
import { useShallow } from 'zustand/shallow';

import { PRODUCT_TYPE } from '@/shared/model/constants';
import type { Product } from '@/shared/model/types';
import { useSocket } from '@/shared/providers/socket/context';

import { storeApi } from '../api';
import { getUpdatedProduct } from '../utils/getUpdatedProduct';

import { STORE_EVENTS } from './constants';
import type { Store, StoreProductBuyEventParams } from './types';

export const useStore = () => {
    const [store, setStore] = useState<Store>(null!);
    
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isRefetching, setIsRefetching] = useState(false);

    const [processingIds, setProcessingIds] = useState<Array<string>>([]);

    const { socket } = useSocket(useShallow((state) => state));

    const controller = useRef<AbortController>(null!);

    const isStoreEmpty = useMemo(() => (store ? Object.values(store).every((products) => !products.length) : !isLoading && !isError), [isLoading, isError, store]);

    useEffect(() => {
        controller.current = new AbortController();
        
        fetchStore('init');

        socket.on(STORE_EVENTS.PRODUCT_BUY, ({ buyedProduct, newProduct, recalculatedPrices }: StoreProductBuyEventParams) => {
            const key = PRODUCT_TYPE[buyedProduct.type];

            setStore((prevState) => {
                if (recalculatedPrices) {
                    const nextState: any = {};
                    
                    Object.entries(prevState).forEach(([key, products]) => {
                        nextState[key] = products.map((product) => {
                            const newPrice = recalculatedPrices[product.slug];
                            
                            if (product._id === buyedProduct._id) {
                                return key === 'LADDER' && newProduct ? newProduct : getUpdatedProduct(product, buyedProduct);
                            }
                            
                            return newPrice ? { ...product, price: newPrice } : product;
                        })
                    });
                    
                    return nextState;
                } else {
                    return {
                        ...prevState,
                        [key]: prevState[key]?.map((product) => {
                            return product._id === buyedProduct._id ? key === 'LADDER' && newProduct ? newProduct : getUpdatedProduct(product, buyedProduct) : product;
                        })
                    };
                }
            });
            
            removeFromProcessingIds(buyedProduct._id);

        });

        return () => {
            socket.off(STORE_EVENTS.PRODUCT_BUY);

            controller.current.abort();
        };
    }, []);

    const onDailyTimerExpired = (_id: string) => {
        setStore((prev) => ({
            ...prev,
            DAILY: prev.DAILY.map((p) => p._id === _id ? { ...p, canBuy: true, nextPayAvailableAt: undefined } : p)
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

    const removeFromProcessingIds = (productId: string) => setProcessingIds((prevState) => prevState.filter((id) => productId !== id));

    const handleBuyProduct = async (product: Product) => {
        try {
            setProcessingIds((prev) => [...prev, product._id]);

            const { data } = await storeApi.getInvoice(product._id);

            const status = await openInvoice(data, 'url', { abortSignal: controller.current.signal });

            if (status === 'paid') {
                // here should be a logic for long poll if there is no socket connection
            } else {
                removeFromProcessingIds(product._id);
            }
        } catch (error) {
            console.error(error);
            removeFromProcessingIds(product._id);
        }
    }

    return {
        store,
        isError,
        isStoreEmpty,
        processingIds,
        isRefetching,
        isLoading,
        handleBuyProduct,
        onDailyTimerExpired,
        refetch: () => fetchStore('refetch')
    };
};