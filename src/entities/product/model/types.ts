import type { Product } from '@/shared/model/types';

export interface ProductProps {
    product: Product;
    as?: React.ElementType;
    isPurchaseInProgress?: boolean;
    onBuy: () => Promise<void>;
}