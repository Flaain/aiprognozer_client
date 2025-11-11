import type { Setter } from '@/shared/model/types';

import type { SessionStore } from './types';

export const sessionActions = (set: Setter<SessionStore>): SessionStore['actions'] => ({
    onSignin: (userId) => set({ userId, isAuthorized: true, isAuthInProgress: false }),
    onSignout: () => {
        set(null!);
    }
});