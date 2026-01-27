import type { TASK_PATH } from './constants';

export type TaskPath = (typeof TASK_PATH)[keyof typeof TASK_PATH];

export type TaskProps = (
    | { task: TasksSocials; taskPath: 'socials' }
    | { task: TasksAds; taskPath: 'ads' }
    | { task: TasksReferrals; taskPath: 'referrals'; currentThreshold: number }
    | { task: TasksRequests; taskPath: 'requests'; currentThreshold: number }
    | { task: TasksDaily; taskPath: 'daily', onTimerExpired: (_id: string) => void }
) & {
    onClaim: (_id: string, reward: number, type: TaskPath, claimedAt: string, nextClaimAvailableAt?: number) => void;
    onRemove: (_id: string, type: TaskPath) => void;
};

export interface TaskBase {
    _id: string;
    title: string;
    description?: string;
    canClaim: boolean;
    claimedAt: string | null;
    reward: number;
}

export interface TasksDaily extends TaskBase {
    nextClaimAvailableAt?: number;
}

export interface TasksSocials extends TaskBase {
    telegram_id?: number;
    telegram_username?: string;
    link: string;
    platform: number;
    type: number;
}

export interface TasksAds extends TaskBase {
    telegram_id?: number;
    telegram_username?: string;
    link: string;
    type: number;
    image_url?: string;
    expireAt: Date;
}

export interface TasksReferrals extends TaskBase {
    threshold: number;
    isAlreadyClaimed: boolean;
}

export interface TasksRequests extends TaskBase {
    threshold: number;
    isAlreadyClaimed: boolean;
}