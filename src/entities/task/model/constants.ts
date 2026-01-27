export const TASK_TYPE = {
    0: 'CHANNEL',
    1: 'GROUP',
    2: 'BOT',
    3: 'EXTERNAL'
} as const;

export const SOCIAL_PLATFORM = {
    0: 'TWITTER',
    1: 'FACEBOOK',
    2: 'INSTAGRAM',
    3: 'TIKTOK',
    4: 'YOUTUBE',
    5: 'TELEGRAM'
} as const;

export const TASK_PATH = {
    SOCIALS: 'socials',
    ADS: 'ads',
    REFERRALS: 'referrals',
    REQUESTS: 'requests',
    DAILY: 'daily'
} as const;
