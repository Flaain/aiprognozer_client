import { api } from '@/shared/api';
import type { Product } from '@/shared/model/types';

export const storeApi = {
    get: (signal?: AbortSignal) => api.get<{ products: Array<Product> }>('/store', { signal }),
    getInvoice: (id: string) => api.post<string>(`/store/get-invoice/${id}`)
};