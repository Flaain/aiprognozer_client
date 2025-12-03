import { StarIcon } from '@/shared/lib/assets/icons';

import { LoadingButton } from '@/shared/ui/loading-button';
import { Typography } from '@/shared/ui/typography';

import type { ProductProps } from '../model/types';


export const Product = ({ product, isPurchaseInProgress, onBuy, as }: ProductProps) => {
    const Component = as ?? 'div';

    return (
        <Component className='flex flex-col gap-4 bg-linear-to-br from-primary-dark-secondary to-transparent p-4 rounded-[14px]'>
            <div className='flex flex-col gap-2 items-start border-b border-primary-dark-secondary pb-4'>
                <Typography size='md' weight='semibold'>
                    {product.name}
                </Typography>
                <Typography as='p' variant='secondary' weight='thin' size='sm' className='text-pretty text-left'>
                    {product.description}
                </Typography>
            </div>
            <div className='flex justify-between items-center gap-5'>
                <div className='flex items-center gap-2'>
                    <StarIcon className='text-yellow-500 size-6' />
                    <Typography size='xl' weight='semibold' className='mt-0.5'>
                        {product.price}
                    </Typography>
                </div>
                <LoadingButton
                    onClick={onBuy}
                    isLoading={isPurchaseInProgress}
                    className='max-w-[200px] max-md:max-w-[150px]'
                    size='lg'
                >
                    Купить
                </LoadingButton>
            </div>
        </Component>
    );
};