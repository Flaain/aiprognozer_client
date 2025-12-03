import { create } from 'zustand';

import { userActions } from './actions';
import type { UserStore } from './types';

export const useUser = create<UserStore>((set, get) => ({
    user: null!,
    actions: userActions(set, get)
}));
