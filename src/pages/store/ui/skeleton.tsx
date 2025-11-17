import { cn } from '@/shared/lib/utils';
import { Container } from '@/shared/ui/container';
import { LoadingButton } from '@/shared/ui/loading-button';
import { Skeleton } from '@/shared/ui/skeleton';
import { Typography } from '@/shared/ui/typography';

import type { StoreSkeletonProps } from '../model/types';

export const StoreSkeleton = ({ shouldAnimate, refetch, isRefetching, isError }: StoreSkeletonProps) => (
    <Container
        as='div'
        className={cn(
            'flex relative flex-col gap-10 pt-5 flex-1 no-scrollbar',
            isError ? 'overflow-hidden' : 'overflow-y-auto'
        )}
    >
        {isError && (
            <div className='flex flex-col justify-center items-center px-5 gap-2 absolute inset-0 bg-primary-dark/80 z-50'>
                <Typography as='h1' weight='semibold' size='3xl'>
                    При получении магазина произошла ошибка
                </Typography>
                <Typography as='p' weight='thin' variant='secondary'>
                    Пожалуйста, попробуйте еще раз
                </Typography>
                <LoadingButton isLoading={isRefetching} onClick={refetch} className='max-w-[380px] w-full mt-5'>
                    Повторить попытку
                </LoadingButton>
            </div>
        )}
        <div
            className={cn(
                'flex flex-col gap-4',
                shouldAnimate && 'animate-in fade-in slide-in-from-bottom-5 duration-300'
            )}
        >
            <div className='flex items-start gap-2'>
                <Skeleton className='size-8 rounded-full' />
                <div className='flex flex-col items-start grow-1 gap-2'>
                    <Skeleton className='w-[250px] h-5 rounded-lg' />
                    <Skeleton className='w-1/2 h-5 rounded-lg' />
                </div>
            </div>
            <div className='flex flex-col gap-4 bg-linear-to-br from-primary-blue/50 to-primary-blue-transparent/10 p-4 rounded-[14px] overflow-hidden'>
                <div className='flex flex-col items-start border-b border-primary-blue/30 pb-4 gap-2'>
                    <Skeleton className='w-1/3 h-5 rounded-lg bg-primary-blue-transparent' />
                    <Skeleton className='w-2/3 h-5 rounded-lg bg-primary-blue-transparent' />
                </div>
                <Skeleton className='w-full h-10 rounded-lg bg-primary-blue-transparent' />
            </div>
        </div>
        <div
            className={cn(
                'flex flex-col gap-4',
                shouldAnimate && 'animate-in fade-in slide-in-from-bottom-5 duration-400'
            )}
        >
            <div className='flex items-start gap-2'>
                <Skeleton className='size-8 rounded-full' />
                <div className='flex flex-col items-start grow-1 gap-2'>
                    <Skeleton className='w-[250px] h-5 rounded-lg' />
                    <Skeleton className='w-1/2 h-5 rounded-lg' />
                </div>
            </div>
            <div className='flex flex-col gap-4 bg-linear-to-br from-primary-dark-secondary to-transparent p-4 rounded-[14px]'>
                <div className='flex flex-col items-start border-b border-primary-dark-secondary pb-4 gap-2'>
                    <Skeleton className='w-1/3 h-5 rounded-lg' />
                    <Skeleton className='w-2/3 h-5 rounded-lg' />
                </div>
                <div className='flex w-full items-center justify-between'>
                    <Skeleton className='w-[120px] h-6 rounded-lg' />
                    <Skeleton className='max-w-[200px] w-full max-md:max-w-[150px] h-10 rounded-lg' />
                </div>
            </div>
        </div>
        <div
            className={cn(
                'flex flex-col gap-4',
                shouldAnimate && 'animate-in fade-in slide-in-from-bottom-5 duration-500'
            )}
        >
            <div className='flex items-start gap-2'>
                <Skeleton className='size-8 rounded-full' />
                <div className='flex flex-col items-start grow-1 gap-2'>
                    <Skeleton className='w-[250px] h-5 rounded-lg' />
                    <Skeleton className='w-1/2 h-5 rounded-lg' />
                </div>
            </div>
            <div className='flex flex-col gap-4 bg-linear-to-br from-primary-dark-secondary to-transparent p-4 rounded-[14px]'>
                <div className='flex flex-col items-start border-b border-primary-dark-secondary pb-4 gap-2'>
                    <Skeleton className='w-1/3 h-5 rounded-lg' />
                    <Skeleton className='w-2/3 h-5 rounded-lg' />
                </div>
                <div className='flex w-full items-center justify-between'>
                    <Skeleton className='w-[120px] h-6 rounded-lg' />
                    <Skeleton className='max-w-[200px] w-full max-md:max-w-[150px] h-10 rounded-lg' />
                </div>
            </div>
        </div>
    </Container>
);
