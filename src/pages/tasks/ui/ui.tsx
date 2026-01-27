import { Task } from '@/entities/task';

import { Container } from '@/shared/ui/container';
import { Typography } from '@/shared/ui/typography';

import { useTasks } from '../model/useTasks';

import { TasksSkeleton } from './skeleton';

export const Tasks = () => {
    const { tasks, isError, isLoading, isRefetching, handleClaimTask, handleRemoveTask, handleDailyTimerExpired, refetch } = useTasks();

    if (isLoading || isError || isRefetching) {
        return <TasksSkeleton isRefetching={isRefetching} isError={isError} refetch={refetch} />;
    }

    return (
        <Container as='div' className='flex-1 flex flex-col gap-5 overflow-y-auto'>
            {!!tasks?.daily.length && (
                <div className='flex items-start justify-start flex-col gap-4'>
                    <Typography size='xl' weight='bold'>
                        Ежедневные задания
                    </Typography>
                    <ul className='flex flex-col w-full gap-5'>
                        {tasks.daily.map((task) => (
                            <Task
                                key={task._id}
                                task={task}
                                taskPath='daily'
                                onTimerExpired={handleDailyTimerExpired}
                                onClaim={handleClaimTask}
                                onRemove={handleRemoveTask}
                            />
                        ))}
                    </ul>
                </div>
            )}
            {!!tasks?.socials.length && (
                <div className='flex items-start justify-start flex-col gap-4'>
                    <Typography size='xl' weight='bold'>
                        Мы в социальных сетях
                    </Typography>
                    <ul className='flex flex-col w-full gap-5'>
                        {tasks.socials.map((task) => (
                            <Task
                                key={task._id}
                                task={task}
                                taskPath='socials'
                                onClaim={handleClaimTask}
                                onRemove={handleRemoveTask}
                            />
                        ))}
                    </ul>
                </div>
            )}
            {!!tasks?.referrals.tasks.length && (
                <div className='flex items-start justify-start flex-col gap-4'>
                    <Typography size='xl' weight='bold'>
                        Награды за друзей
                    </Typography>
                    <ul className='flex flex-col w-full gap-5'>
                        {tasks.referrals.tasks.map((task) => (
                            <Task
                                key={task._id}
                                task={task}
                                currentThreshold={tasks.referrals.total_verified}
                                taskPath='referrals'
                                onClaim={handleClaimTask}
                                onRemove={handleRemoveTask}
                            />
                        ))}
                    </ul>
                </div>
            )}
            {!!tasks?.requests.tasks.length && (
                <div className='flex items-start justify-start flex-col gap-4'>
                    <Typography size='xl' weight='bold'>
                        Награды за анализы
                    </Typography>
                    <ul className='flex flex-col w-full gap-5'>
                        {tasks.requests.tasks.map((task) => (
                            <Task
                                key={task._id}
                                task={task}
                                currentThreshold={tasks.requests.total_requests}
                                taskPath='requests'
                                onClaim={handleClaimTask}
                                onRemove={handleRemoveTask}
                            />
                        ))}
                    </ul>
                </div>
            )}
        </Container>
    );
};