import { useEffect, useState } from 'react';

import type { TasksAds, TasksDaily, TasksReferrals, TasksRequests, TasksSocials, TaskPath } from '@/entities/task';
import { useUser } from '@/entities/user';

import { tasksApi } from '../api';

import type { GetTasksResponse } from './types';

export const useTasks = () => {
    const [tasks, setTasks] = useState<GetTasksResponse>(null!);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isRefetching, setIsRefetching] = useState(false);

    const updateUserOnTaskClaim = useUser((state) => state.actions.onTaskClaim);

    useEffect(() => {
        fetchTasks('init');
    }, []);

    const fetchTasks = async (action: 'init' | 'refetch') => {
        try {
            action === 'init' ? setIsLoading(true) : setIsRefetching(true);

            const { data } = await tasksApi.get();

            setTasks(data);
            setIsError(false);
        } catch (error) {
            console.error(error);

            setIsError(true);
        } finally {
            setIsLoading(false);
            setIsRefetching(false);
        }
    };

    const handleClaimTask = (_id: string, reward: number, type: TaskPath, claimedAt: string, nextClaimAvailableAt?: number) => {
        try {
            setTasks((prevState) => {
                const isArray = Array.isArray(prevState[type]);
    
                const arr: Array<TasksAds | TasksReferrals | TasksSocials | TasksRequests | TasksDaily> = [
                    ...(Array.isArray(prevState[type]) ? prevState[type] : prevState[type].tasks)
                ]; // cannot use isArray flag. TS complains. Weird
    
                const elemIndex = arr.findIndex((task) => task._id === _id);
    
                if (elemIndex === -1) throw new Error(`Cannot claim task. Task not found: id=${_id}, type=${type}`);
    
                const elem = arr.splice(elemIndex, 1)[0];
    
                arr.push({
                    ...elem,
                    ...('isAlreadyClaimed' in elem && { isAlreadyClaimed: true }),
                    ...(type === 'daily' && { nextClaimAvailableAt }),
                    claimedAt,
                    canClaim: false
                });
    
                return {
                    ...prevState,
                    [type]: isArray ? arr : { ...prevState[type], tasks: arr }
                };
            });
    
            reward > 0 && updateUserOnTaskClaim(reward);
        } catch (error) {
            console.error(error);
        }
    };

    const handleRemoveTask = (_id: string, type: keyof GetTasksResponse) => {
        setTasks((prevState) => {
            const arr = (Array.isArray(prevState[type]) ? prevState[type] : prevState[type].tasks).filter((task) => task._id !== _id);

            return {
                ...prevState,
                [type]: Array.isArray(prevState[type]) ? arr : { ...prevState[type], tasks: arr }
            };
        })
    };

    const handleDailyTimerExpired = (_id: string) => {
        setTasks((prevState) => ({
            ...prevState,
            daily: prevState.daily.map((task) => task._id === _id ? { ...task, claimedAt: null, nextClaimAvailableAt: undefined, canClaim: true } : task)
        }))
    }

    return {
        tasks,
        isError,
        isLoading,
        isRefetching,
        handleClaimTask,
        handleRemoveTask,
        handleDailyTimerExpired,
        refetch: () => fetchTasks('refetch')
    };
};