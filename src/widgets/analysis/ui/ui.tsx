import { useBackButtonTelegram } from '@/shared/hooks/useBackButton';
import type { Analysis as IAnalysis } from '@/shared/model/types';
import { Counter } from '@/shared/ui/counter';
import { Progressbar } from '@/shared/ui/progressbar';
import { Typography } from '@/shared/ui/typography';

export const Analysis = ({ analysis, onBack }: { analysis: IAnalysis; onBack: () => void; }) => {
    useBackButtonTelegram(onBack);

    return (
        <>
            <div className='flex items-start justify-start flex-col gap-2'>
                <Typography as='h1' size='2xl' weight='semibold'>
                    Основной прогноз
                </Typography>
                <Typography as='p' variant='secondary' size='md' weight='thin' className='text-left text-pretty'>
                    Наиболее вероятный результат, основанный на анализе искусственного интеллекта
                </Typography>
            </div>
            <div className='rounded-[14px] bg-linear-to-br from-primary-blue/50 to-primary-blue-transparent/10 p-4 max-sm:p-3 gap-4 flex items-center max-md:items-start max-md:flex-col justify-between'>
                <div className='flex flex-col gap-1'>
                    <Typography size='3xl' weight='bold' className='text-start text-pretty'>
                        {analysis.prediction.name}
                    </Typography>
                    <Typography as='p' variant='secondary' size='xl' className='text-left'>
                        {analysis.prediction.abbr}
                    </Typography>
                </div>
                <div className='flex flex-col gap-1'>
                    <Counter start={10} end={analysis.prediction.probability} />
                    <Typography as='p' variant='secondary' size='xl'>
                        уверенность ИИ
                    </Typography>
                </div>
            </div>
            <div className='flex flex-col items-start gap-2 p-5 max-sm:p-3 rounded-[14px] bg-linear-to-br from-primary-dark-secondary to-transparent'>
                <Typography size='xl' weight='semibold'>
                    Рассуждения
                </Typography>
                <Typography className='text-start text-pretty' variant='secondary' weight='thin'>
                    {analysis.prediction.reasoning}
                </Typography>
            </div>
            <div className='flex flex-col gap-5'>
                <Typography as='h2' size='xl' weight='semibold' className='text-start'>
                    Альтернативные прогнозы
                </Typography>
                <ul className='grid grid-rows-2 grid-cols-2 max-sm:grid-cols-1 gap-5 max-sm:gap-3'>
                    {analysis.alternatives.map(({ name, abbr, probability }, index) => (
                        <li key={index} className='flex flex-col gap-2 p-5 max-sm:p-3 rounded-[14px] bg-primary-dark-secondary'>
                            <div className='flex items-center justify-between gap-5'>
                                <div className='flex flex-col items-start overflow-hidden'>
                                    <Typography title={name} className='text-ellipsis whitespace-nowrap overflow-hidden w-full'>{name}</Typography>
                                    <Typography variant='secondary' weight='thin'>
                                        {abbr}
                                    </Typography>
                                </div>
                                <Typography>{probability}%</Typography>
                            </div>
                            <Progressbar progress={probability} />
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};
