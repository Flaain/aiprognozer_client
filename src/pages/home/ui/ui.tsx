import { Suspense, useState } from 'react';

import { Analysis, AnalysisSkeleton } from '@/widgets/analysis';
import { Upload, UploadSkeleton } from '@/widgets/upload';

import type { Analysis as IAnalysis } from '@/shared/model/types';
import { Container } from '@/shared/ui/container';

export const Home = () => {
    const [analysis, setAnalysis] = useState<IAnalysis | null>(null);

    return (
        <Container className='flex flex-col'>
            {analysis ? (
                <Suspense fallback={<AnalysisSkeleton />}>
                    <Analysis analysis={analysis} onBack={() => setAnalysis(null)} />
                </Suspense>
            ) : (
                <Suspense fallback={<UploadSkeleton />}>
                    <Upload onAnalysisReady={setAnalysis} />
                </Suspense>
            )}
        </Container>
    );
};