import { StarIcon } from '@/shared/lib/assets/icons';

import { LoadingButton } from '@/shared/ui/loading-button';
import { Typography } from '@/shared/ui/typography';

import { PRODUCT_TYPE } from '../model/constants';
import type { Product as IProduct } from '../model/types';

import { DailyProduct } from './daily';

export const Product = ({ product }: { product: IProduct }) => {
    if (PRODUCT_TYPE[product.type] === 'DAILY') {
        return <DailyProduct product={product} />;
    }

    return (
        <div className='flex flex-col gap-4 bg-linear-to-br from-primary-dark-secondary to-transparent p-4 rounded-[14px]'>
            <div className='flex flex-col items-start border-b border-primary-dark-secondary pb-4'>
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
                <LoadingButton className='max-w-[200px] max-md:max-w-[150px]' size='lg'>
                    Купить
                </LoadingButton>
            </div>
        </div>
    );
};