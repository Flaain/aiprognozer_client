
import type { Setter } from '@/shared/model/types';

import type { UserStore } from './types';

export const userActions = (set: Setter<UserStore>, get: () => UserStore): UserStore['actions'] => ({
    onSignin: (user) => set({ user }),
    onVerify: () => set((prevState) => ({ user: { ...prevState.user, isVerified: true } })),
    onRequestLimitExceeded: () => set((prevState) => ({ user: { ...prevState.user, request_count: prevState.user.request_limit } })),
    updateFirstRequestAt: (date) => set((prevState) => ({ user: { ...prevState.user, first_request_at: date } })),
    updateRequestCount: (action: 'inc' | 'dec' | 'reset') => set((prevState) => ({
        user: {
            ...prevState.user,
            request_count: action === 'reset' ? 0 : action === 'inc' ? prevState.user.request_count + 1 : prevState.user.request_count - 1
        }
    })),
    applyProductEffect: (effect) => {
        const { user } = get();
        
        let atleastOneEffectApplied = false;

        for (const { value, effect_type, target } of effect.filter(({ target }) => user.hasOwnProperty(target))) {
            const isNums = typeof user[target] === 'number' && typeof value === 'number';

            switch (effect_type) {
                case 'inc':
                    if (isNums) {
                        user[target] += value;
                        atleastOneEffectApplied = true;
                    }
                    break;
                case 'dec':
                    if (isNums) {
                        user[target] -= value;
                        atleastOneEffectApplied = true;
                    }
                    break;
                case 'reset':
                    user[target] = 0;
                    atleastOneEffectApplied = true;
                    break;
                case 'set':
                    user[target] = value!;
                    atleastOneEffectApplied = true;
                    break;
            }
        }

        atleastOneEffectApplied && set({ user });
    }
});