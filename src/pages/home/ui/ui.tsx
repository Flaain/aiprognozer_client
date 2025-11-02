import { useState } from 'react';

import { Upload } from '@/widgets/upload';

import type { Analysis } from '@/shared/model/types';
import { Container } from '@/shared/ui/container';

export const Home = () => {
    const [analysis, setAnalysis] = useState<Analysis | null>(null);

    return (
        <Container className='flex flex-col'>
            <Upload onAnalysisReady={setAnalysis} />
        </Container>
    );
};