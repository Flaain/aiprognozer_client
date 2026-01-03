import type { Referall } from '@/shared/model/types';

export interface ReferallsPageState {
    rewards: {
        [key: string]: Record<string, number>;
    };
    referalls: {
        items: Array<Referall>;
        meta: {
            hasMore: boolean;
            perPage: number;
            nextCursor: string | null;
        };
    };
    code: string;
}