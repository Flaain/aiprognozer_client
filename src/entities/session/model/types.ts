export interface SessionStore {
    userId: string;
    isAuthorized: boolean;
    isAuthInProgress: boolean;
    actions: {
        onSignout: () => void;
        onSignin: (userId: string) => void;
    }
}