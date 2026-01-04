import { create } from 'zustand';

import type { Analysis } from '@/shared/model/types';

import type { HomeStore } from './types';

export const useHome = create<HomeStore>((set) => ({
    analysis: null,
    actions: {
        setAnalysis: (analysis: Analysis) => set({ analysis }),
        resetAnalysis: () => set({ analysis: null })
    }
}));