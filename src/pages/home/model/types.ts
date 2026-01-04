import type { Analysis } from '@/shared/model/types';

export interface HomeStore {
    analysis: Analysis | null;
    actions: {
        setAnalysis: (analysis: Analysis) => void;
        resetAnalysis: () => void;
    };
}