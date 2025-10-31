export type Setter<T> = (state: Partial<T> | ((state: T) => Partial<T>)) => void;

export interface User {
    _id: string;
    telegram_id: string;
    last_request_at: Date;
    last_reset_at: Date;
    request_count: number;
    request_limit: number;
    isBanned: boolean;
    isUnlimited: boolean;
    isVerified: boolean;
    referall?: string;
}

export interface ApiDefaultSuccessResponse {
    message: string;
}