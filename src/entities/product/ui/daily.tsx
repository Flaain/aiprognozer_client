import { useEffect } from 'react';

import { StarIcon } from '@/shared/lib/assets/icons';

import { useTimer } from '@/shared/hooks/useTimer';
import { LoadingButton } from '@/shared/ui/loading-button';
import { Typography } from '@/shared/ui/typography';

import type { ProductProps } from '../model/types';

const $24h = 1000 * 60 * 60 * 24;

export const DailyProduct = ({ product, onBuy, onTimerExpired, subscribe, isPurchaseInProgress, as }: ProductProps & { onTimerExpired: (_id: string) => void }) => {
    const Component = as ?? 'div';
    const availableAt = product.canBuy ? null : +new Date(+new Date(product.payedAt!) + $24h) / 1000 - Date.now() / 1000 - 1;

    const { hours, minutes, seconds, start } = useTimer(availableAt, { onExpire: () => onTimerExpired(product._id) });

    useEffect(() => {
        const unsubscribe = subscribe((event, _id) => {
            event === 'product_buy' && _id === product._id && start($24h - 1);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <Component className='flex flex-col gap-4 bg-linear-to-br from-primary-blue/50 to-primary-blue-transparent/10 p-4 rounded-[14px]'>
            <div className='flex flex-col gap-2 items-start border-b border-primary-blue/30 pb-4'>
                <Typography size='md' weight='semibold'>
                    {product.name}
                </Typography>
                <Typography as='p' variant='secondary' weight='thin' size='sm' className='text-pretty text-left'>
                    {product.description}
                </Typography>
            </div>
            <div className='flex justify-between items-center gap-5'>
                <LoadingButton
                    className='select-none'
                    onClick={onBuy}
                    cta={product.canBuy && !isPurchaseInProgress}
                    disabled={!product.canBuy || isPurchaseInProgress}
                    isLoading={isPurchaseInProgress}
                    size='lg'
                >
                    {product.canBuy ? (
                        <>
                            <Typography size='xl' weight='semibold' className='mt-0.5'>
                                {product.price}
                            </Typography>
                            <StarIcon className='text-yellow-500 size-6' />
                        </>
                    ) : (
                        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
                    )}
                </LoadingButton>
            </div>
        </Component>
    );
};