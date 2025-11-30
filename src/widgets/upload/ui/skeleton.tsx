import { Skeleton } from '@/shared/ui/skeleton';

export const UploadSkeleton = () => {
    return (
        <div className='flex flex-col gap-5 w-full box-border relative'>
            <Skeleton className='h-10 rounded-lg' />
            <Skeleton className='relative h-[450px] before:border-t-0 transition-colors ease-in-out border-primary-white-secondary/30 duration-300 flex flex-col p-5 max-sm:p-3 items-center justify-center gap-1 box-border border-2 border-dashed rounded-[14px]'></Skeleton>
            <Skeleton className='h-14 rounded-[14px]' />
        </div>
    );
};