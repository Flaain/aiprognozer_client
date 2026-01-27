
import { useTimer } from '@/shared/hooks/useTimer';
import { cn } from '@/shared/lib/utils';
import { ONE_DAY_IN_SECONDS } from '@/shared/model/constants';
import { LoadingButton } from '@/shared/ui/loading-button';
import { Progressbar } from '@/shared/ui/progressbar';
import { Typography } from '@/shared/ui/typography';
import { getEnding } from '@/shared/utils/getEnding';
import { getTimerString } from '@/shared/utils/getTimerString';

import type { TaskProps } from '../model/types';
import { useTask } from '../model/useTask';

export const Task = (props: TaskProps) => {
    const { step, isVerifying, handleStartTask, handleVerifyTask } = useTask(props);

    const isDaily = props.taskPath === 'daily';
    const isThreshold = props.taskPath === 'referrals' || props.taskPath === 'requests';
    const isClaimed = isThreshold ? props.task.isAlreadyClaimed : !props.task.canClaim;

    const timer = useTimer(
        isDaily ? props.task.canClaim ? null : props.task.nextClaimAvailableAt === ONE_DAY_IN_SECONDS ? ONE_DAY_IN_SECONDS - 1 : props.task.nextClaimAvailableAt : null,
        isDaily ? { onExpire: () => props.onTimerExpired(props.task._id) } : undefined
    );

    return (
        <li
            className={cn(
                'bg-linear-to-br from-primary-dark-secondary to-transparent border-primary-dark-secondary border-[0.5px] p-3 rounded-lg',
                isClaimed && 'from-green-500/20 to-primary-dark border-green-800'
            )}
        >
            {isThreshold ? (
                <div className='flex items-center justify-between'>
                    <Typography className='text-pretty' weight='semibold' size='md'>
                        {props.task.title}
                    </Typography>
                    <Typography className='text-pretty' variant='secondary' weight='medium' size='md'>
                        {Math.min(props.currentThreshold, props.task.threshold)}/{props.task.threshold}
                    </Typography>
                </div>
            ) : (
                <Typography className='text-left truncate block' weight='semibold' size='md'>
                    {props.task.title}
                </Typography>
            )}
            {props.task.description && (
                <Typography
                    as='p'
                    variant='secondary'
                    weight='thin'
                    className='line-clamp-3 text-pretty text-left mt-2'
                >
                    {props.task.description}
                </Typography>
            )}
            {isThreshold && (
                <Progressbar
                    progress={(Math.min(props.currentThreshold, props.task.threshold) / props.task.threshold) * 100}
                    progressClassnames={isClaimed ? 'bg-green-500/30' : undefined}
                />
            )}
            <div className='flex items-center justify-between mt-5'>
                {!!props.task.reward && (
                    <Typography>
                        +{props.task.reward}&nbsp;{getEnding(props.task.reward, ['запрос', 'запроса', 'запросов'])}
                    </Typography>
                )}
                {(isDaily || props.task.canClaim) && (
                    <LoadingButton
                        disabled={isClaimed || isVerifying || (isThreshold && props.currentThreshold < props.task.threshold)}
                        isLoading={isVerifying}
                        onClick={step === 0 ? handleStartTask : handleVerifyTask}
                        className='w-[120px] ml-auto'
                    >
                        {isDaily && isClaimed ? getTimerString(timer) : step === 0 ? 'Перейти' : 'Проверить'}
                    </LoadingButton>
                )}
            </div>
        </li>
    );
};