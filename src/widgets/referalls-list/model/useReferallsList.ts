
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';

import type { ReferallsListProps } from './types';

export const useReferallsList = ({ canLoadMore, onLoadMore }: Pick<ReferallsListProps, 'canLoadMore' | 'onLoadMore'>) => {
    const { ref } = useInfiniteScroll({ canLoadMore, onLoadMore });

    return ref;
};