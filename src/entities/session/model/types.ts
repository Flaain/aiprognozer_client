export interface SessionStore {
    user_id: string;
    is_authorized: boolean;
    is_auth_in_progress: boolean;
    actions: {
        onSignout: () => void;
        onSignin: (userId: string) => void;
    }
}