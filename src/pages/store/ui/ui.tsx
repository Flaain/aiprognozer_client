import { Suspense } from 'react';

import { StoreWindow } from '@/widgets/store-window';

import { DailyProduct, Product, ProductSkeleton } from '@/entities/product';

import { ClockIcon, UpChartIcon } from '@/shared/lib/assets/icons';

import { Container } from '@/shared/ui/container';

import { useStore } from '../model/useStore';

import { StoreSkeleton } from './skeleton';

export const Store = () => {
    const { store, isLoading, processingIds, isRefetching, isError, isStoreEmpty, onDailyTimerExpired, refetch, handleBuyProduct } = useStore();

    if (isLoading || isError || isStoreEmpty) {
        return (
            <StoreSkeleton
                isError={isError || isStoreEmpty}
                isRefetching={isRefetching}
                refetch={refetch}
                {...(isStoreEmpty && {
                    errorTitle: 'Похоже, тут пока пусто',
                    errorDescription: 'Загляните позже или запросите список товаров еще раз'
                })}
            />
        );
    }
    
    return (
        <Container as='div' className='flex flex-col gap-10 flex-1 overflow-y-auto'>
            {store?.DAILY && (
                <StoreWindow
                    title='Ежедневное предложение'
                    description='Обновляется раз в сутки'
                    icon={<ClockIcon className='text-primary-blue size-6' />}
                >
                    {store?.DAILY.map((product) => (
                        <Suspense key={product._id} fallback={<ProductSkeleton type='DAILY' />}>
                            <DailyProduct
                                onBuy={() => handleBuyProduct(product)}
                                product={product}
                                isPurchaseInProgress={processingIds.includes(product._id)}
                                onTimerExpired={onDailyTimerExpired}
                            />
                        </Suspense>
                    ))}
                </StoreWindow>
            )}
            {store?.LADDER && (
                <StoreWindow
                    title='Увелечение лимита'
                    icon={<UpChartIcon className='text-primary-blue size-6' />}
                >
                    {store?.LADDER.map((product) => (
                        <Suspense key={product._id} fallback={<ProductSkeleton type='LADDER' />}>
                            <Product
                                onBuy={() => handleBuyProduct(product)}
                                product={product}
                                isPurchaseInProgress={processingIds.includes(product._id)}
                            />
                        </Suspense>
                    ))}
                </StoreWindow>
            )}
        </Container>
    );
};