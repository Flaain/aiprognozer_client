import { api } from '@/shared/api';

import type { GetTasksResponse } from '../model/types';

export const tasksApi = {
    get: () => api.get<GetTasksResponse>('/tasks')
};