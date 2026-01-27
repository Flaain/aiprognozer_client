import type { BuyedProduct, Product } from '@/shared/model/types';

export const getUpdatedProduct = (product: Product, buyedProduct: BuyedProduct) => ({
    ...product,
    canBuy: false,
    payedAt: buyedProduct.payedAt,
    nextPayAvailableAt: buyedProduct.nextPayAvailableAt
});