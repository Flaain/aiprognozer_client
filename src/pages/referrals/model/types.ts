import type { Referral } from '@/shared/model/types';

export interface ReferralsPageState {
    rewards: {
        [key: string]: Record<string, number>;
    };
    referrals: {
        items: Array<Referral>;
        meta: {
            hasMore: boolean;
            perPage: number;
            nextCursor: string | null;
        };
    };
    code: string;
}