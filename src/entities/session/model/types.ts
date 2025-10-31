export interface SessionStore {
    user_id: string;
    is_authorized: boolean;
    is_auth_in_progress: boolean;
    actions: {
        on_signout: () => void;
        on_signin: (userId: string) => void;
    }
}