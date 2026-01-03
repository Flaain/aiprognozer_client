import { useCallback, useEffect, useRef, useState } from 'react';

import { shareMessage } from '@telegram-apps/sdk-react';

import { userApi } from '@/entities/user';

import type { ReferralsPageState } from './types';

export const useReferrals = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isRefetching, setIsRefetching] = useState(false);
    const [data, setData] = useState<ReferralsPageState>(null!);

    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [isErrorMore, setIsErrorMore] = useState(false);
    const [isRefetchingMore, setIsRefetchingMore] = useState(false);
    
    const [isCopied, setIsCopied] = useState(false);
    const [isInviteInProgress, setIsInviteInProgress] = useState(false);

    const controller = useRef<AbortController>(null!);

    const isEmpty = !isLoading && !isError && !data?.referrals.items.length;

    useEffect(() => {
        controller.current = new AbortController();

        handleFetchReferrals('init');

        return () => {
            controller.current.abort();
        }
    }, []);

    const handleCopy = () => {
        if (isCopied) return;

        navigator.clipboard.writeText(`${import.meta.env.VITE_BOT_URL}?startapp=${data?.code}`);
        
        setIsCopied(true);

        setTimeout(setIsCopied, 3000, false);
    };

    const handleInvite = async () => {
        try {
            setIsInviteInProgress(true);

            const { data } = await userApi.invite();
            
            await shareMessage(data, { abortSignal: controller.current.signal });
        } catch (error) {
            console.error(error);
        } finally {
            setIsInviteInProgress(false);
        }
    }

    const handleFetchReferrals = async (action: 'init' | 'refetch') => {
        try {
            action === 'init' ? setIsLoading(true) : setIsRefetching(true);

            const { data } = await userApi.referrals<ReferralsPageState>();

            setData(data);
            setIsError(false);
        } catch (error) {
            setIsError(true);
        } finally {
            setIsLoading(false);
            setIsRefetching(false);
        }
    };

    const onLoadMore = useCallback(async (action: 'load' | 'refetch' = 'load') => {
        try {
            action === 'load' ? setIsLoadingMore(true) : setIsRefetchingMore(true);

            const res = await userApi.referrals<Pick<ReferralsPageState, 'referrals'>>(data.referrals.meta.nextCursor!);

            setData((prevState) => ({
                ...prevState,
                referrals: {
                    items: [...prevState.referrals.items, ...res.data.referrals.items],
                    meta: res.data.referrals.meta
                }
            }));

            setIsErrorMore(false);
        } catch (error) {
            setIsErrorMore(true);
        } finally {
            setIsLoadingMore(false);
            setIsRefetchingMore(false);
        }
    }, [data]);

    return {
        data,
        isLoading,
        isError,
        isEmpty,
        isRefetching,
        isLoadingMore,
        isErrorMore,
        isRefetchingMore,
        isCopied,
        isInviteInProgress,
        onLoadMore,
        handleCopy,
        handleInvite,
        refetch: () => handleFetchReferrals('refetch')
    };
};