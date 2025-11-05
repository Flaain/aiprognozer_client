import type { Setter } from '@/shared/model/types';

import type { UserStore } from './types';

export const userActions = (set: Setter<UserStore>): UserStore['actions'] => ({
    onSignin: (user) => set({ user }),
    onVerify: () => set((prevState) => ({ user: { ...prevState.user, isVerified: true } })),
    updateLastRequestAt: (date) => set((prevState) => ({ user: { ...prevState.user, last_request_at: date } })),
    updateRequestCount: (action: 'inc' | 'dec') => set((prevState) => ({
        user: {
            ...prevState.user,
            request_count: action === 'inc' ? prevState.user.request_count + 1 : prevState.user.request_count - 1
        }
    })),
});