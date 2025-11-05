import { useState } from 'react';

import { Analysis } from '@/widgets/analysis';
import { Upload } from '@/widgets/upload';

import type { Analysis as IAnalysis } from '@/shared/model/types';
import { Container } from '@/shared/ui/container';

export const Home = () => {
    const [analysis, setAnalysis] = useState<IAnalysis | null>(null);
    
    return (
        <Container className='flex flex-col'>
            {analysis ? (
                <Analysis analysis={analysis} onBack={() => setAnalysis(null)} />
            ) : (
                <Upload onAnalysisReady={setAnalysis} />
            )}
        </Container>
    );
};
