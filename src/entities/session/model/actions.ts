import type { Setter } from '@/shared/model/types';

import type { SessionStore } from './types';

export const sessionActions = (set: Setter<SessionStore>): SessionStore['actions'] => ({
    onSignin: (user_id) => set({ user_id, is_authorized: true, is_auth_in_progress: false }),
    onSignout: () => {
        set(null!);
    }
});