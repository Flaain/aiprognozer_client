import type { Setter } from '@/shared/model/types';

import type { SessionStore } from './types';

export const sessionActions = (set: Setter<SessionStore>): SessionStore['actions'] => ({
    on_signin: (user_id) => set({ user_id, is_authorized: true, is_auth_in_progress: false }),
    on_signout: () => {
        set(null!);
    }
});