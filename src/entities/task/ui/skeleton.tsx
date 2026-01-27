import { Skeleton } from '@/shared/ui/skeleton';

export const TaskSkeleton = () => (
    <Skeleton className='bg-linear-to-br from-primary-dark-secondary to-transparent bg-primary-dark-secondary/30 before:border-none border-primary-dark-secondary border-[0.5px] p-3 w-full max-md:h-40 h-auto rounded-lg flex flex-col gap-5 justify-between'>
        <div className='flex flex-col gap-2'>
            <Skeleton className='w-1/2 h-5 rounded-lg bg-primary-dark before:border-none' />
            <Skeleton className='w-2/3 h-5 rounded-lg bg-primary-dark before:border-none' />
        </div>
        <div className='flex items-center justify-between gap-2'>
            <Skeleton className='w-[80px] h-5 rounded-lg bg-primary-dark before:border-none' />
            <Skeleton className='w-[120px] h-10 rounded-lg bg-primary-blue before:via-gray-200/50' />
        </div>
    </Skeleton>
);