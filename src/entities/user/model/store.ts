import { create } from 'zustand';

import { userActions } from './actions';
import type { UserStore } from './types';

export const useUser = create<UserStore>((set) => ({
    user: null!,
    actions: userActions(set)
}));
