import { cn } from '@/shared/lib/utils';
import type { PRODUCT_TYPE } from '@/shared/model/constants';
import { Skeleton } from '@/shared/ui/skeleton';

export const ProductSkeleton = ({ type = 'DEFAULT' }: { type?: (typeof PRODUCT_TYPE)[keyof typeof PRODUCT_TYPE] }) => (
    <div
        className={cn(
            'flex flex-col gap-4 bg-linear-to-br p-4 rounded-[14px] overflow-hidden',
            type === 'DAILY'
                ? 'from-primary-blue/50 to-primary-blue-transparent/10'
                : 'from-primary-dark-secondary to-transparent'
        )}
    >
        <div className={cn('flex flex-col items-start border-b pb-4 gap-2', type === 'DAILY' ? 'border-primary-blue/30' : 'border-primary-dark-secondary')}>
            <Skeleton className={cn('w-1/3 h-5 rounded-lg', type === 'DAILY' && 'bg-primary-blue-transparent')} />
            <Skeleton className={cn('w-2/3 h-5 rounded-lg', type === 'DAILY' && 'bg-primary-blue-transparent')} />
        </div>
        {type === 'DAILY' ? (
            <Skeleton className='w-full h-10 rounded-lg bg-primary-blue-transparent' />
        ) : (
            <div className='flex w-full items-center justify-between'>
                <Skeleton className='w-[120px] h-6 rounded-lg' />
                <Skeleton className='max-w-[200px] w-full max-md:max-w-[150px] h-10 rounded-lg' />
            </div>
        )}
    </div>
);