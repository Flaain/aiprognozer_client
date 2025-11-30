import { useCallback, useEffect, useMemo, useState } from 'react';

import { openInvoice } from '@telegram-apps/sdk-react';
import { useShallow } from 'zustand/shallow';

import { PRODUCT_TYPE, type IProduct } from '@/entities/product';

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

    useEffect(() => {
        fetchStore('init');

        socket.on(STORE_EVENTS.PRODUCT_BUY, (product: Required<Pick<IProduct, '_id' | 'type' | 'payedAt'>>, newProduct?: IProduct) => {
            console.log('buy!', product);
        });

        return () => {
            socket.off(STORE_EVENTS.PRODUCT_BUY);
        };
    }, []);

    const isStoreEmpty = useMemo(() => (store ? Object.values(store).every((products) => !products.length) : !isLoading && !isError), [isLoading, isError, store]);

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

    const handleBuyProduct = async (product: IProduct) => {
        try {
            setProcessingIds((prev) => [...prev, product._id]);

            const { data } = await storeApi.getInvoice(product._id);

            const status = await openInvoice(data, 'url');

            if (status === 'paid' && !isConnected) {
                // send poll request
            }
        } catch (error) {
            console.error(error);
        } finally {
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
        handleBuyProduct,
        onDailyTimerExpired,
        refetch: () => fetchStore('refetch')
    };
};