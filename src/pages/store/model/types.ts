import type { IProduct, PRODUCT_TYPE } from '@/entities/product';

export type Store = Record<(typeof PRODUCT_TYPE)[keyof typeof PRODUCT_TYPE], Array<IProduct>>;
export type BuyedProduct = Required<Pick<IProduct, '_id' | 'type' | 'payedAt' | 'effect' | 'slug'>>;

export interface StoreSkeletonProps {
    shouldAnimate?: boolean;
    isError?: boolean;
    refetch?: () => void;
    isRefetching?: boolean;
    errorTitle?: string;
    errorDescription?: string;
}
