import { cn } from '@/shared/lib/utils';
import type { SkeletonProps } from '@/shared/model/types';
import { Container } from '@/shared/ui/container';
import { LoadingButton } from '@/shared/ui/loading-button';
import { Skeleton } from '@/shared/ui/skeleton';
import { Typography } from '@/shared/ui/typography';

export const ReferralsSkeleton = ({ isError, refetch, isRefetching }: SkeletonProps) => (
    <Container
        as='div'
        className={cn('flex-1 flex flex-col gap-5 overflow-y-auto relative', isError && 'overflow-hidden')}
    >
        {isError && (
            <div className='flex flex-col justify-center items-center pt-10 px-5 gap-2 z-50 absolute inset-0 bg-primary-dark/80'>
                <Typography as='h1' weight='semibold' size='xl'>
                    При получении списка друзей произошла ошибка
                </Typography>
                <Typography as='p' weight='thin' variant='secondary'>
                    Пожалуйста, попробуйте еще раз
                </Typography>
                <LoadingButton isLoading={isRefetching} onClick={refetch} className='max-w-[380px] w-full mt-5'>
                    Повторить попытку
                </LoadingButton>
            </div>
        )}
        <div className=' flex flex-col items-start gap-2 p-5 max-sm:p-3 rounded-[14px] bg-linear-to-br from-primary-dark-secondary to-transparent'>
            <Typography as='h1' size='xl' weight='bold' className='text-start text-pretty'>
                Приглашайте друзей и получайте бонусы
            </Typography>
            <div className='flex flex-col gap-3 w-full'>
                <Skeleton className='w-[200px] h-5 rounded-lg' />
                <Skeleton className='w-full h-14 rounded-lg' />
            </div>
            <div className='mt-5 flex w-full items-center justify-between gap-2 sticky bottom-0'>
                <Skeleton className='flex-1 h-10 rounded-lg' />
                <Skeleton className='w-[50px] h-10 rounded-lg' />
            </div>
        </div>
        <div className='flex items-start flex-col gap-2 flex-1'>
            <Typography as='h2' size='lg'>
                Ваши друзья
            </Typography>
            <ul className='flex flex-col w-full'>
                {[...new Array(5)].map((_, index) => (
                    <li key={index} className='flex justify-between items-center'>
                        <Skeleton className='h-[60px] mb-3 flex-1 rounded-lg' />
                    </li>
                ))}
            </ul>
        </div>
    </Container>
);