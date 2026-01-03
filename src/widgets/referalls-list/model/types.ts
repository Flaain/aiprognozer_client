import type { Referall } from '@/shared/model/types';

export interface ReferallLoadedMore {
    items: Array<Referall>;
    meta: {
        total: number;
        hasMore: boolean;
        perPage: number;
        itemsLeft: number;
    };
}

export interface ReferallsListProps {
    referalls: Array<Referall>;
    isLoading: boolean;
    isError: boolean;
    isRefetching: boolean;
    onLoadMore: (action?: 'load' | 'refetch') => void;
    canLoadMore: boolean;
}