import type { SportType } from '@/features/sport-dropdown';

import { api } from '@/shared/api';
import type { Analysis } from '@/shared/model/types';

export const uploadApi = {
    upload: (form: FormData, type: SportType) => api.post<Analysis & { first_request_at: string }>('/analysis', form, { headers: { 'content-type': 'multipart/form-data' }, params: { type } }),
    status: (signal: AbortSignal) => api.get<{ isReachedLimit: boolean; nextRequestsAvailableAt?: number }>('/analysis/status', { signal })
};
