import type { PRODUCT_TYPE } from './constants';

export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    slug: string;
    type: ProductType;
    canBuy?: boolean;
    lastBuyAt: string;
    prev?: string | null;
    next?: string | null;
    isLastProductWasPurchased?: boolean;
}

export type ProductType = keyof typeof PRODUCT_TYPE;