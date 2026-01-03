import type { Referral } from '@/shared/model/types';

export interface ReferralLoadedMore {
    items: Array<Referral>;
    meta: {
        total: number;
        hasMore: boolean;
        perPage: number;
        itemsLeft: number;
    };
}

export interface ReferralsListProps {
    referrals: Array<Referral>;
    isLoading: boolean;
    isError: boolean;
    isRefetching: boolean;
    onLoadMore: (action?: 'load' | 'refetch') => void;
    canLoadMore: boolean;
}