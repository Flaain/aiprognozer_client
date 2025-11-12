import { ClockIcon, StarIcon, UpChartIcon } from '@/shared/lib/assets/icons';

import { Container } from '@/shared/ui/container';
import { LoadingButton } from '@/shared/ui/loading-button';
import { Typography } from '@/shared/ui/typography';

export const Store = () => {
    return (
        <Container as='div' className='flex flex-col gap-10 pt-5'>
            <div className='flex flex-col gap-4'>
                <div className='flex items-start gap-2'>
                    <Typography className='p-2 rounded-full bg-primary-blue-transparent'>
                        <ClockIcon className='text-primary-blue size-6' />
                    </Typography>
                    <div className='flex flex-col items-start'>
                        <Typography size='xl'>Ежедневное предложение</Typography>
                        <Typography as='p' variant='secondary' weight='thin' size='md'>
                            Обновляется раз в сутки
                        </Typography>
                    </div>
                </div>
                <div className='flex flex-col gap-4 bg-linear-to-br from-primary-blue/50 to-primary-blue-transparent/10 p-4 rounded-[14px]'>
                    <div className='flex flex-col items-start border-b border-primary-blue/30 pb-4'>
                            <Typography size='md' weight='semibold'>
                                Сброс запросов
                            </Typography>
                            <Typography
                                as='p'
                                variant='secondary'
                                weight='thin'
                                size='sm'
                                className='text-pretty text-left'
                            >
                                Сбросьте количество запросов прямо сейчас, вместо того, чтобы ждать 24 часа
                            </Typography>
                    </div>
                    <div className='flex justify-between items-center gap-5'>
                        <div className='flex items-center gap-2'>
                            <StarIcon className='text-primary-white size-6' />
                            <Typography size='xl' weight='semibold'>
                                150
                            </Typography>
                        </div>
                        <LoadingButton cta className='max-w-[200px] max-md:max-w-[150px]' size='lg'>
                            Купить
                        </LoadingButton>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-4'>
                <div className='flex items-start gap-2'>
                    <Typography className='p-2 rounded-full bg-primary-blue-transparent'>
                        <UpChartIcon className='text-primary-blue size-6' />
                    </Typography>
                    <div className='flex flex-col items-start'>
                        <Typography size='xl'>Улучшения</Typography>
                        <Typography as='p' variant='secondary' className='text-left text-pretty' weight='thin' size='md'>
                            Каждое можно купить только один раз
                        </Typography>
                    </div>
                </div>
                <div className='flex flex-col gap-5'>
                    <div className='flex flex-col gap-4 bg-linear-to-br from-primary-dark-secondary to-transparent p-4 rounded-[14px]'>
                        <div className='flex flex-col items-start border-b border-primary-dark-secondary pb-4'>
                            <Typography size='md' weight='semibold'>
                                +10 к лимиту запросов
                            </Typography>
                            <Typography
                                as='p'
                                variant='secondary'
                                weight='thin'
                                size='sm'
                                className='text-pretty text-left'
                            >
                                Повысьте лимит запросов на 10
                            </Typography>
                        </div>
                        <div className='flex justify-between items-center gap-5'>
                            <div className='flex items-center gap-2'>
                                <StarIcon className='text-primary-white size-6' />
                                <Typography size='xl' weight='semibold'>
                                    100
                                </Typography>
                            </div>
                            <LoadingButton className='max-w-[200px] max-md:max-w-[150px]' size='lg'>
                                Купить
                            </LoadingButton>
                        </div>
                    </div>
                    <div className='flex flex-col gap-4 bg-linear-to-br from-primary-dark-secondary to-transparent p-4 rounded-[14px]'>
                        <div className='flex flex-col items-start border-b border-primary-dark-secondary pb-4'>
                            <Typography size='md' weight='semibold'>
                                +50 к лимиту запросов
                            </Typography>
                            <Typography
                                as='p'
                                variant='secondary'
                                weight='thin'
                                size='sm'
                                className='text-pretty text-left'
                            >
                                Повысьте лимит запросов на 50
                            </Typography>
                        </div>
                        <div className='flex justify-between items-center gap-5'>
                            <div className='flex items-center gap-2'>
                                <StarIcon className='text-primary-white size-6' />
                                <Typography size='xl' weight='semibold'>
                                    489
                                </Typography>
                            </div>
                            <LoadingButton className='max-w-[200px] max-md:max-w-[150px]' size='lg'>
                                Купить
                            </LoadingButton>
                        </div>
                    </div>
                    <div className='flex flex-col gap-4 bg-linear-to-br from-primary-dark-secondary to-transparent p-4 rounded-[14px]'>
                        <div className='flex flex-col items-start border-b border-primary-dark-secondary pb-4'>
                            <Typography size='md' weight='semibold'>
                                +100 к лимиту запросов
                            </Typography>
                            <Typography
                                as='p'
                                variant='secondary'
                                weight='thin'
                                size='sm'
                                className='text-pretty text-left'
                            >
                                Повысьте лимит запросов на 100
                            </Typography>
                        </div>
                        <div className='flex justify-between items-center gap-5'>
                            <div className='flex items-center gap-2'>
                                <StarIcon className='text-primary-white size-6' />
                                <Typography size='xl' weight='semibold'>
                                    990
                                </Typography>
                            </div>
                            <LoadingButton className='max-w-[200px] max-md:max-w-[150px]' size='lg'>
                                Купить
                            </LoadingButton>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};