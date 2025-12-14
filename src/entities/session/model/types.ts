export interface SessionStore {
    userId: string;
    isAuthorized: boolean;
    error: unknown;
    isAuthInProgress: boolean;
    actions: {
        onSignout: () => void;
        onSignin: (userId: string) => void;
    }
}