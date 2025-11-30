import type { IProduct } from '@/entities/product';

import { api } from '@/shared/api';

export const storeApi = {
    get: (signal?: AbortSignal) => api.get<{ products: Array<IProduct> }>('/store', { signal }),
    getInvoice: (id: string) => api.post<string>(`/store/get-invoice/${id}`)
};