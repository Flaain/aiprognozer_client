import { api } from "@/shared/api";
import type { User } from "@/shared/model/types";

export const authApi = {
    login: () => api.post<User>('/auth/login')
}