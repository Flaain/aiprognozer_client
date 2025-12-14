export interface SessionStore {
    userId: string;
    isAuthorized: boolean;
    error: string | null;
    isAuthInProgress: boolean;
    actions: {
        onSignout: () => void;
        onSignin: (userId: string) => void;
    }
}