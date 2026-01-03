import { api } from '@/shared/api';
import type { User } from '@/shared/model/types';

export const authApi = {
    login: (ref?: string) => api.post<User>('/auth/login', undefined, {
        timeout: 10000,
        timeoutErrorMessage: 'Login timeout',
        params: { ref }
    })
};