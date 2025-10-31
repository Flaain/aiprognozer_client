import { create } from 'zustand';

import { sessionActions } from './actions';
import type { SessionStore } from './types';

export const useSession = create<SessionStore>((set) => ({
    user_id: null!,
    is_auth_in_progress: true,
    is_authorized: false,
    actions: sessionActions(set)
}));