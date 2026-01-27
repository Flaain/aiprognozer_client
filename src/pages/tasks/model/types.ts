import type { TASK_PATH, TasksAds, TasksDaily, TasksReferrals, TasksRequests, TasksSocials } from '@/entities/task';

export interface GetTasksResponse {
    [TASK_PATH.SOCIALS]: Array<TasksSocials>;
    [TASK_PATH.ADS]: Array<TasksAds>;
    [TASK_PATH.DAILY]: Array<TasksDaily>;
    [TASK_PATH.REFERRALS]: {
        tasks: Array<TasksReferrals>;
        total_verified: number;
    };
    [TASK_PATH.REQUESTS]: {
        tasks: Array<TasksRequests>;
        total_requests: number;
    };
}