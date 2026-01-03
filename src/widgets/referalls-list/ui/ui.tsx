import { LoadingButton } from '@/shared/ui/loading-button';
import { Skeleton } from '@/shared/ui/skeleton';
import { Typography } from '@/shared/ui/typography';

import type { ReferallsListProps } from '../model/types';
import { useReferallsList } from '../model/useReferallsList';

export const ReferallsList = ({
    canLoadMore,
    isError,
    isLoading,
    isRefetching,
    onLoadMore,
    referalls
}: ReferallsListProps) => {
    const ref = useReferallsList({ canLoadMore, onLoadMore });

    return (
        <>
            <ul className='flex flex-col gap-3 w-full'>
                {referalls.map(({ name, isVerified, telegram_id }, index, array) => (
                    <li
                        key={telegram_id}
                        ref={index === array.length - 1 ? ref : null}
                        className='flex items-center gap-3 px-3 py-2 rounded-lg bg-linear-to-br from-primary-dark-secondary to-transparent border-primary-dark-secondary border-[0.5px]'
                    >
                        <Typography
                            className='select-none flex justify-center items-center size-10 rounded-full bg-primary-dark'
                            size='2xl'
                        >
                            {name[0].toUpperCase()}
                        </Typography>
                        <div className='flex flex-col flex-1 min-w-0'>
                            <Typography size='lg' className='block truncate text-left' title={name}>
                                {name}
                            </Typography>
                            <Typography className='text-left' variant='secondary' size='xs'>
                                {isVerified ? 'Подтвержден' : 'Не подтвержден'}
                            </Typography>
                        </div>
                    </li>
                ))}
                {isLoading && (
                    <>
                        <li className='flex justify-between items-center'>
                            <Skeleton className='h-[60px] flex-1 rounded-lg' />
                        </li>
                        <li className='flex justify-between items-center'>
                            <Skeleton className='h-[60px] flex-1 rounded-lg' />
                        </li>
                        <li className='flex justify-between items-center'>
                            <Skeleton className='h-[60px] flex-1 rounded-lg' />
                        </li>
                    </>
                )}
            </ul>
            {isError && (
                <LoadingButton
                    isLoading={isRefetching}
                    onClick={() => onLoadMore('refetch')}
                    variant='icon'
                    size='icon'
                    className='font-normal mx-auto whitespace-normal text-primary-white hover:text-primary-white-secondary w-auto'
                >
                    Ошибка загрузки
                </LoadingButton>
            )}
        </>
    );
};