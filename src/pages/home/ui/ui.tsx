import { Suspense, useState } from 'react';

import { Analysis, AnalysisSkeleton } from '@/widgets/analysis';
import { Upload, UploadSkeleton } from '@/widgets/upload';

import type { Analysis as IAnalysis } from '@/shared/model/types';
import { Container } from '@/shared/ui/container';

export const Home = () => {
    const [analysis, setAnalysis] = useState<IAnalysis | null>(null);

    return (
        <Container as='div' className='grow-1'>
            {analysis ? (
                <Suspense fallback={<AnalysisSkeleton onBack={() => setAnalysis(null)} />}>
                    <Analysis onBack={() => setAnalysis(null)} analysis={analysis} />
                </Suspense>
            ) : (
                <Suspense fallback={<UploadSkeleton />}>
                    <Upload onAnalysisReady={setAnalysis} />
                </Suspense>
            )}
            ;
        </Container>
    );
};
