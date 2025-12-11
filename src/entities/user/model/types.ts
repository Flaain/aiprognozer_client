import type { ProductEffect, User } from '@/shared/model/types';

export interface UserStore {
    user: User;
    actions: {
        onSignin: (user: User) => void;
        onVerify: () => void;
        updateRequestCount: (action: 'inc' | 'dec' | 'reset') => void;
        updateFirstRequestAt: (date: string) => void;
        onRequestLimitExceeded: () => void;
        applyProductEffect: (effect: Array<ProductEffect>) => void;
    };
}