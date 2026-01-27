import { StarIcon } from '@/shared/lib/assets/icons';

import { useTimer } from '@/shared/hooks/useTimer';
import { ONE_DAY_IN_SECONDS } from '@/shared/model/constants';
import { LoadingButton } from '@/shared/ui/loading-button';
import { Typography } from '@/shared/ui/typography';
import { getTimerString } from '@/shared/utils/getTimerString';

import type { ProductProps } from '../model/types';

export const DailyProduct = ({ product, onBuy, onTimerExpired, isPurchaseInProgress, as }: ProductProps & { onTimerExpired: (_id: string) => void }) => {
    const Component = as ?? 'div';

    const timer = useTimer(
        product.canBuy ? null : ONE_DAY_IN_SECONDS === product.nextPayAvailableAt ? ONE_DAY_IN_SECONDS - 1 : product.nextPayAvailableAt, 
        { onExpire: () => onTimerExpired(product._id) }
    );

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
                        `${getTimerString(timer)}`
                    )}
                </LoadingButton>
            </div>
        </Component>
    );
};