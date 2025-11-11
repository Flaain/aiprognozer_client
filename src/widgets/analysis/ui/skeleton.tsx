import { useBackButtonTelegram } from '@/shared/hooks/useBackButton';
import { Skeleton } from '@/shared/ui/skeleton';
import { Typography } from '@/shared/ui/typography';

export const AnalysisSkeleton = ({ onBack }: { onBack: () => void }) => {
    useBackButtonTelegram(onBack);

    return (
        <div className='flex flex-col gap-5'>
            <div className='flex items-start justify-start flex-col gap-2'>
                <Typography as='h1' size='2xl' weight='semibold'>
                    Основной прогноз
                </Typography>
                <Typography as='p' variant='secondary' size='md' weight='thin' className='text-left text-pretty'>
                    Наиболее вероятный результат, основанный на анализе искусственного интеллекта
                </Typography>
            </div>
            <div className='rounded-[14px] bg-linear-to-br from-primary-blue/50 to-primary-blue-transparent/10 p-4 max-sm:p-3 gap-4 flex items-center max-md:items-start max-md:flex-col justify-between'>
                <div className='flex flex-col gap-1 w-full'>
                    <Skeleton className='w-1/2 h-5 rounded-lg bg-primary-dark/50' />
                    <Skeleton className='w-20 h-5 rounded-lg bg-primary-dark/50' />
                </div>
                <div className='flex flex-col gap-1 items-end max-md:items-start w-full'>
                    <Skeleton className='w-20 h-5 rounded-lg bg-primary-dark/50' />
                    <Skeleton className='w-1/3 h-5 rounded-lg bg-primary-dark/50' />
                </div>
            </div>
            <div className='flex flex-col items-start gap-2 p-5 max-sm:p-3 rounded-[14px] bg-linear-to-br from-primary-dark-secondary to-transparent'>
                <Typography size='xl' weight='semibold'>
                    Рассуждения
                </Typography>
                <Skeleton className='w-full h-20 rounded-[14px]' />
            </div>
            <div className='flex flex-col gap-5'>
                <Typography as='h2' size='xl' weight='semibold' className='text-start'>
                    Альтернативные прогнозы
                </Typography>
                <div className='grid grid-rows-2 grid-cols-2 max-sm:grid-cols-1 gap-5 max-sm:gap-3'>
                    <Skeleton className='w-full h-20 rounded-[14px]' />
                    <Skeleton className='w-full h-20 rounded-[14px]' />
                    <Skeleton className='w-full h-20 rounded-[14px]' />
                    <Skeleton className='w-full h-20 rounded-[14px]' />
                </div>
            </div>
        </div>
    );
};