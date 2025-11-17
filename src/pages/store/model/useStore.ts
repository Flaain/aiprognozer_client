import { useCallback, useEffect, useState } from 'react';

import { PRODUCT_TYPE } from '@/entities/product';

import { storeApi } from '../api';

import type { Store } from './types';

export const useStore = () => {
    const [store, setStore] = useState<Store>(null!);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isRefetching, setIsRefetching] = useState(false);
    
    useEffect(() => {
        fetchStore('init');
    }, []);

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

    return { store, isRefetching, isLoading, isError, refetch: () => fetchStore('refetch') };
};