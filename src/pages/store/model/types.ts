import type { PRODUCT_TYPE } from '@/shared/model/constants';
import type { BuyedProduct, Product } from '@/shared/model/types';

export type Store = Record<(typeof PRODUCT_TYPE)[keyof typeof PRODUCT_TYPE], Array<Product>>;

export interface StoreProductBuyEventParams {
    buyedProduct: BuyedProduct;
    newProduct?: Product;
    recalculatedPrices?: Record<string, number>;
}
