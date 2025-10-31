import { api } from "@/shared/api";
import type { ApiDefaultSuccessResponse } from "@/shared/model/types";

export const userApi = {
    verify: (id: string) => api.post<ApiDefaultSuccessResponse>('/user/verify', undefined, { params: { id } })
}