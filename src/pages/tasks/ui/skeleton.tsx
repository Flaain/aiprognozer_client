import { TaskSkeleton } from '@/entities/task';

import { cn } from '@/shared/lib/utils';
import type { SkeletonProps } from '@/shared/model/types';
import { Container } from '@/shared/ui/container';
import { LoadingButton } from '@/shared/ui/loading-button';
import { Skeleton } from '@/shared/ui/skeleton';
import { Typography } from '@/shared/ui/typography';

export const TasksSkeleton = ({ refetch, isRefetching, isError, errorDescription, errorTitle }: SkeletonProps) => (
    <Container
        as='div'
        className={cn(
            'flex relative flex-col gap-10 flex-1 no-scrollbar',
            isError ? 'overflow-hidden' : 'overflow-y-auto'
        )}
    >
        {isError && (
            <div className='flex flex-col justify-center items-center px-5 gap-2 absolute inset-0 bg-primary-dark/80 z-50'>
                <Typography as='h1' weight='semibold' size='3xl'>
                    {errorTitle || 'При получении заданий произошла ошибка'}
                </Typography>
                <Typography as='p' weight='thin' variant='secondary'>
                    {errorDescription || 'Пожалуйста, попробуйте еще раз'}
                </Typography>
                <LoadingButton isLoading={isRefetching} onClick={refetch} className='max-w-[380px] w-full mt-5'>
                    Повторить попытку
                </LoadingButton>
            </div>
        )}
        <div className='flex flex-col'>
            <Skeleton className='w-[250px] h-5 rounded-md before:border-none' />
            <div className='flex flex-col gap-3 mt-5'>
                <TaskSkeleton />
                <TaskSkeleton />
                <TaskSkeleton />
            </div>
        </div>
        <div className='flex flex-col'>
            <Skeleton className='w-[250px] h-5 rounded-md before:border-none' />
            <Skeleton className='w-[150px] h-5 rounded-md before:border-none mt-2' />
            <div className='flex flex-col gap-3 mt-5'>
                <TaskSkeleton />
                <TaskSkeleton />
                <TaskSkeleton />
            </div>
        </div>
    </Container>
);