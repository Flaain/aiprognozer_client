import { StarIcon } from '@/shared/lib/assets/icons';

import { LoadingButton } from '@/shared/ui/loading-button';
import { Typography } from '@/shared/ui/typography';

import type { Product } from '../model/types';

export const DailyProduct = ({ product }: { product: Product }) => {
    return (
        <div className='flex flex-col gap-4 bg-linear-to-br from-primary-blue/50 to-primary-blue-transparent/10 p-4 rounded-[14px]'>
            <div className='flex flex-col items-start border-b border-primary-blue/30 pb-4'>
                <Typography size='md' weight='semibold'>
                    {product.name}
                </Typography>
                <Typography as='p' variant='secondary' weight='thin' size='sm' className='text-pretty text-left'>
                    {product.description}
                </Typography>
            </div>
            <div className='flex justify-between items-center gap-5'>
                <LoadingButton cta size='lg'>
                    <Typography size='xl' weight='semibold' className='mt-0.5'>
                        {product.price}
                    </Typography>
                    <StarIcon className='text-yellow-500 size-6' />
                </LoadingButton>
            </div>
        </div>
    );
};