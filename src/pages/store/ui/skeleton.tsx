import { StoreWindowSkeleton } from '@/widgets/store-window';

import { ProductSkeleton } from '@/entities/product';

import { cn } from '@/shared/lib/utils';
import { Container } from '@/shared/ui/container';
import { LoadingButton } from '@/shared/ui/loading-button';
import { Typography } from '@/shared/ui/typography';

import type { StoreSkeletonProps } from '../model/types';

export const StoreSkeleton = ({ shouldAnimate, refetch, isRefetching, isError, errorDescription, errorTitle }: StoreSkeletonProps) => (
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
                    {errorTitle || 'При получении магазина произошла ошибка'}
                </Typography>
                <Typography as='p' weight='thin' variant='secondary'>
                    {errorDescription || 'Пожалуйста, попробуйте еще раз'}
                </Typography>
                <LoadingButton isLoading={isRefetching} onClick={refetch} className='max-w-[380px] w-full mt-5'>
                    Повторить попытку
                </LoadingButton>
            </div>
        )}
        <StoreWindowSkeleton shouldAnimate={shouldAnimate}>
            <ProductSkeleton type='DAILY' />
        </StoreWindowSkeleton>
        <StoreWindowSkeleton className='duration-400' shouldAnimate={shouldAnimate}>
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
        </StoreWindowSkeleton>
    </Container>
);