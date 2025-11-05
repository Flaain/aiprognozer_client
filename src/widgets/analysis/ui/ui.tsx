import type { Analysis as IAnalysis } from '@/shared/model/types';

export const Analysis = ({ analysis }: { analysis: IAnalysis; onBack: () => void }) => {
    console.log(analysis);
    return null;
};