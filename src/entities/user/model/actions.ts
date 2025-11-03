import type { Setter } from '@/shared/model/types';

import type { UserStore } from './types';

export const userActions = (set: Setter<UserStore>): UserStore['actions'] => ({
    on_signin: (user) => set({ user }),
    on_verify: () => set((prevState) => ({ user: { ...prevState.user, is_verified: true } })),
    on_request: () => set((prevState) => ({ user: { ...prevState.user, request_count: prevState.user.request_count + 1 } }))
});