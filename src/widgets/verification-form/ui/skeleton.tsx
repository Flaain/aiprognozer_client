import { Container } from '@/shared/ui/container';
import { Skeleton } from '@/shared/ui/skeleton';

export const VerificationFormSkeleton = () => {
    return (
        <Container className='flex'>
            <div className='flex flex-col justify-center max-w-md w-full mx-auto'>
                <div className='flex flex-col items-center gap-2 mb-5'>
                    <Skeleton className='size-20 rounded-full mb-3' />
                    <Skeleton className='w-[80%] h-6 rounded-lg' />
                    <Skeleton className='w-1/2 h-6 rounded-lg' />
                </div>
                <Skeleton className='w-full h-10 rounded-lg mb-3' />
                <Skeleton className='w-full h-10 rounded-lg' />
                <Skeleton className='w-full h-40 rounded-[10px] mt-6' />
            </div>
        </Container>
    );
};