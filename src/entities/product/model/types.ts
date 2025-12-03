import type { ProductEffectType, ProductSlugs } from '@/shared/model/types';

import type { PRODUCT_TYPE } from './constants';

export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    slug: ProductSlugs;
    type: ProductType;
    canBuy?: boolean;
    payedAt?: string;
    prev?: string | null;
    next?: string | null;
    effect?: Array<ProductEffect>;
}

export interface ProductEffect {
    value: number | boolean;
    effect_type: ProductEffectType;
    target: string;
}

export type ProductType = keyof typeof PRODUCT_TYPE;

export interface ProductProps {
    product: Product;
    as?: React.ElementType;
    isPurchaseInProgress?: boolean;
    onBuy: () => Promise<void>;
    subscribe: (subscriber: (event: string, _id: string) => void) => () => void;
}