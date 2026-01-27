import { Suspense } from 'react';

import { Analysis, AnalysisSkeleton } from '@/widgets/analysis';
import { Upload, UploadSkeleton } from '@/widgets/upload';

import { Container } from '@/shared/ui/container';

import { useHome } from '../model/store';

export const Home = () => {
    const analysis = useHome((state) => state.analysis);

    const setAnalysis = useHome((state) => state.actions.setAnalysis);
    const resetAnalysis = useHome((state) => state.actions.resetAnalysis);

    return (
        <Container
            as='div'
            className='flex flex-1 overflow-y-auto no-scrollbar flex-col box-border size-full relative gap-5'
        >
            {analysis ? (
                <Suspense fallback={<AnalysisSkeleton onBack={resetAnalysis} />}>
                    <Analysis onBack={resetAnalysis} analysis={analysis} />
                </Suspense>
            ) : (
                <Suspense fallback={<UploadSkeleton />}>
                    <Upload onAnalysisReady={setAnalysis} />
                </Suspense>
            )}
        </Container>
    );
};