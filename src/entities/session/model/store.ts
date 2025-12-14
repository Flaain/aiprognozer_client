import { create } from 'zustand';

import { sessionActions } from './actions';
import type { SessionStore } from './types';

export const useSession = create<SessionStore>((set) => ({
    userId: null!,
    isAuthInProgress: true,
    isAuthorized: false,
    error: null,
    actions: sessionActions(set)
}));