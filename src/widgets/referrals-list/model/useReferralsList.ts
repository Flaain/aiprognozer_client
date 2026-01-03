import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';

import type { ReferralsListProps } from './types';

export const useReferralsList = ({ canLoadMore, onLoadMore }: Pick<ReferralsListProps, 'canLoadMore' | 'onLoadMore'>) => {
    const { ref } = useInfiniteScroll({ canLoadMore, onLoadMore });

    return ref;
};