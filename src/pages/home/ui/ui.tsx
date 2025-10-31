import { Upload } from '@/widgets/upload';

import { Container } from '@/shared/ui/container';

export const Home = () => {
    return (
        <Container className='flex flex-col items-center justify-center'>
            <Upload />
        </Container>
    );
};