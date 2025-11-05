import type { SportType } from '@/features/sport-dropdown';

import { api } from '@/shared/api';
import type { Analysis } from '@/shared/model/types';

export const uploadApi = {
    upload: (form: FormData, type: SportType) => api.post<Analysis & { last_request_at: Date }>('/analysis', form, {
        headers: { 'content-type': 'multipart/form-data' },
        params: { type }
    })
};