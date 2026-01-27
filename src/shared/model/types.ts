import type { PRODUCT_EFFECT_TYPE, PRODUCT_TYPE } from './constants';

export type Setter<T> = (state: Partial<T> | ((state: T) => Partial<T>)) => void;
export type ApiExceptionCode =
    | 'REFERRAL_NOT_EXISTS'
    | 'REFERRAL_ALREADY_TAKEN'
    | 'ALREADY_VERIFIED'
    | 'REQUEST_LIMIT_EXCEEDED'
    | 'TASK_NOT_EXISTS'
    | 'TASK_ALREADY_CLAIMED'
    | 'NOT_MEMBER_OF_CHAT';

export type ProductEffectType = (typeof PRODUCT_EFFECT_TYPE)[keyof typeof PRODUCT_EFFECT_TYPE];
export type BuyedProduct = Required<Pick<Product, '_id' | 'type' | 'payedAt' | 'effect' | 'slug' | 'nextPayAvailableAt'>>;
export type ProductType = keyof typeof PRODUCT_TYPE;

export interface ProductEffect {
    value: number | boolean;
    effect_type: ProductEffectType;
    target: string;
}

export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    slug: string;
    type: ProductType;
    canBuy?: boolean;
    payedAt?: string;
    nextPayAvailableAt?: number;
    prev?: string | null;
    next?: string | null;
    effect?: Array<ProductEffect>;
}

export interface User {
    _id: string;
    telegram_id: string;
    first_request_at?: string;
    request_count: number;
    request_limit: number;
    isBanned: boolean;
    isUnlimited: boolean;
    isVerified: boolean;
    onewin_id?: number;
    role: 'USER' | 'ADMIN';

    [key: string]: any; // temp solution
}

export interface Referral {
    _id: string;
    name: string;
    telegram_id: number;
    createdAt: string;
    isVerified: boolean;
}

export interface ApiDefaultSuccessResponse {
    message: string;
}

export interface ApiFailureData<T = undefined> {
    message: string;
    timestamp: string;
    code?: ApiExceptionCode;
    path: string;
    statusCode: number;
    method: string;
    data?: T;
}

export interface Prediction {
    name: string;
    abbr: string;
    reasoning: string;
    probability: number;
}

export interface Analysis {
    prediction: Prediction;
    alternatives: Array<Omit<Prediction, 'reasoning'>>;
}

export interface SkeletonProps {
    refetch?: () => Promise<void>;
    isRefetching?: boolean;
    isError?: boolean;
    errorDescription?: string;
    errorTitle?: string;
}