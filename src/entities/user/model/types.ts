import type { User } from "@/shared/model/types";

export interface UserStore {
    user: User;
    actions: {
        on_signin: (user: User) => void;
        on_verify: () => void;
        on_request: () => void;
    };
}