import { useCallback, useRef } from 'react';

type UseInfiniteScrollProps = {
    canLoadMore: boolean;
    onLoadMore: () => void;
    rootMargin?: string;
};

export const useInfiniteScroll = ({ canLoadMore, onLoadMore, rootMargin = '100px' }: UseInfiniteScrollProps) => {
    const observer = useRef<IntersectionObserver | null>(null);

    const ref = useCallback((node: HTMLElement | null) => {
        observer.current?.disconnect();

        if (!node || !canLoadMore) return;

        observer.current = new IntersectionObserver((entries) => {
            entries[0].isIntersecting && canLoadMore && onLoadMore();
        }, { rootMargin });

        observer.current.observe(node);
    }, [canLoadMore, onLoadMore, rootMargin]);

    return { ref }; 
};
