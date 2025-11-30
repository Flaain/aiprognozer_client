import { cn } from '@/shared/lib/utils';
import { Skeleton } from '@/shared/ui/skeleton';

export const StoreWindowSkeleton = ({
    children,
    shouldAnimate,
    className
}: {
    className?: string;
    children: React.ReactNode;
    shouldAnimate?: boolean;
}) => (
    <div
        className={cn('flex flex-col gap-4', shouldAnimate && 'animate-in fade-in slide-in-from-bottom-5 duration-300', className)}
    >
        <div className='flex items-start gap-2'>
            <Skeleton className='size-8 rounded-full' />
            <div className='flex flex-col items-start grow-1 gap-2'>
                <Skeleton className='w-[250px] h-5 rounded-lg' />
                <Skeleton className='w-1/2 h-5 rounded-lg' />
            </div>
        </div>
        {children}
    </div>
);