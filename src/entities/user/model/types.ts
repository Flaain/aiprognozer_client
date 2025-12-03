import type { ProductEffect } from '@/entities/product';

import type { User } from '@/shared/model/types';

export interface UserStore {
    user: User;
    actions: {
        onSignin: (user: User) => void;
        onVerify: () => void;
        updateRequestCount: (action: 'inc' | 'dec') => void;
        updateFirstRequestAt: (date: string) => void;
        onRequestLimitExceeded: () => void;
        applyProductEffect: (effect: Array<ProductEffect>) => void;
    };
}