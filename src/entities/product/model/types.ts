import type { PRODUCT_TYPE } from './constants';

export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    slug: string;
    type: ProductType;
    canBuy?: boolean;
    payedAt?: string;
    prev?: string | null;
    next?: string | null;
}

export type ProductType = keyof typeof PRODUCT_TYPE;

export interface ProductProps {
    product: Product;
    as?: React.ElementType;
    isPurchaseInProgress?: boolean;
    onBuy: () => void;
}