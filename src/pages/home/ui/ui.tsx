import { Suspense, useState } from 'react';

import { Analysis, AnalysisSkeleton } from '@/widgets/analysis';
import { Upload, UploadSkeleton } from '@/widgets/upload';

import type { Analysis as IAnalysis } from '@/shared/model/types';
import { MainLayout } from '@/shared/ui/main-layout';

export const Home = () => {
    const [analysis, setAnalysis] = useState<IAnalysis | null>(null);

    return (
        <MainLayout>
            {analysis ? (
                <Suspense fallback={<AnalysisSkeleton onBack={() => setAnalysis(null)} />}>
                    <Analysis onBack={() => setAnalysis(null)} analysis={analysis} />
                </Suspense>
            ) : (
                <Suspense fallback={<UploadSkeleton />}>
                    <Upload onAnalysisReady={setAnalysis} />
                </Suspense>
            )}
        </MainLayout>
    );
};