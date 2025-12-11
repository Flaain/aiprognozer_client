import type { PRODUCT_TYPE } from "@/shared/model/constants";
import type { Product } from "@/shared/model/types";

export type Store = Record<(typeof PRODUCT_TYPE)[keyof typeof PRODUCT_TYPE], Array<Product>>;

export interface StoreSkeletonProps {
    shouldAnimate?: boolean;
    isError?: boolean;
    refetch?: () => void;
    isRefetching?: boolean;
    errorTitle?: string;
    errorDescription?: string;
}
