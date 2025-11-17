import { StoreWindow } from '@/widgets/store-window';

import { Product } from '@/entities/product';

import { ClockIcon, UpChartIcon } from '@/shared/lib/assets/icons';

import { Container } from '@/shared/ui/container';

import { useStore } from '../model/useStore';

import { StoreSkeleton } from './skeleton';

export const Store = () => {
    const { store, isLoading, isRefetching, isError, refetch } = useStore();

    if (isLoading || isError) return <StoreSkeleton isError={isError} isRefetching={isRefetching} refetch={refetch} />;

    return (
        <Container as='div' className='flex flex-col gap-10 pt-5 flex-1 overflow-y-auto no-scrollbar'>
            <StoreWindow
                title='Ежедневное предложение'
                description='Обновляется раз в сутки'
                icon={<ClockIcon className='text-primary-blue size-6' />}
            >
                {store?.DAILY.map((product) => (
                    <Product key={product._id} product={product} />
                ))}
            </StoreWindow>
            <StoreWindow
                title='Улучшения'
                description='Каждое улучшение открывается постепенно'
                icon={<UpChartIcon className='text-primary-blue size-6' />}
                className='duration-400'
            >
                {store?.LADDER.map((product) => (
                    <Product key={product._id} product={product} />
                ))}
            </StoreWindow>
        </Container>
    );
};