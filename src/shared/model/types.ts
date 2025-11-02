export type Setter<T> = (state: Partial<T> | ((state: T) => Partial<T>)) => void;
export type ApiExceptionCode = 'REFERALL_NOT_EXISTS' | 'REFERALL_ALREADY_TAKEN' | 'ALREADY_VERIFIED';

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

export interface ApiFailureData {
    message: string;
    timestamp: string;
    code?: ApiExceptionCode;
    path: string;
    statusCode: number;
}

export interface Prediction {
    name: string;
    abbr: string;
    description: string;
    probability: number;
}

export interface Analysis {
    main_prediction: Prediction;
    secondary_predictions: Array<Omit<Prediction, 'description'>>;
}