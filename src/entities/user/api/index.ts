import { api } from "@/shared/api";
import type { ApiDefaultSuccessResponse } from "@/shared/model/types";

export const userApi = {
    verify: (id: string) => api.post<ApiDefaultSuccessResponse>('/user/verify', undefined, { params: { id } }),
    referalls: <T>(cursor?: string) => api.get<T>('/user/referalls', { params: { cursor } }),
    invite: () => api.get<string>('/user/invite'), 
}