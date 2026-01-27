import { api } from '@/shared/api';

import type { TaskPath } from '../model/types';

export const taskApi = {
    verify: (_id: string, type: TaskPath) => api.post<{ claimedAt: string, nextClaimAvailableAt?: number }>(`/tasks/verify/${_id}`, undefined, { params: { type } })
};