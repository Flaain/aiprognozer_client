import { Container } from '@/shared/ui/container';
import { Skeleton } from '@/shared/ui/skeleton';

export const VerifyFormSkeleton = () => {
    return (
        <Container className='flex h-full pt-0'>
            <div className='flex flex-col justify-center max-w-md w-full mx-auto'>
                <div className='flex flex-col items-center gap-2 mb-5'>
                    <Skeleton className='size-20 rounded-full mb-3' />
                    <Skeleton className='w-1/2 h-6 rounded-lg' />
                    <Skeleton className='w-[80%] h-6 rounded-lg' />
                </div>
                <div className='flex flex-col mt-5'>
                    <Skeleton className='w-[100px] h-5 rounded-lg mb-3' />
                    <Skeleton className='w-full h-10 rounded-lg mb-3' />
                </div>
                <Skeleton className='w-full h-10 rounded-lg' />
                <Skeleton className='w-full h-30 rounded-[10px] mt-6' />
            </div>
        </Container>
    );
};