export type ApiExceptionCode = 'REFERALL_NOT_EXISTS' | 'REFERALL_ALREADY_TAKEN' | 'ALREADY_VERIFIED';

export interface ApiFailureData {
    message: string;
    timestamp: string;
    code?: ApiExceptionCode;
    path: string;
    statusCode: number;
}

export class ApiException {
    private readonly error: ApiFailureData;

    constructor(error: ApiFailureData) {
        this.error = error;
    }
}