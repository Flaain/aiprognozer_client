import type { User } from '@/shared/model/types';

export interface UserStore {
    user: User;
    actions: {
        onSignin: (user: User) => void;
        onVerify: () => void;
        updateRequestCount: (action: 'inc' | 'dec') => void;
        updateLastRequestAt: (date: Date) => void;
    };
}