import type { ApiExceptionCode } from "../api";

export const MAX_ID_LENGTH = 9;
export const REQUEST_LIMIT = 10;

export const ERROR_CODE_TO_MESSAGE: Record<ApiExceptionCode, string> = {
    REFERALL_ALREADY_TAKEN: 'Кто-то уже зарегистрировался с таким id',
    REFERALL_NOT_EXISTS: 'Не удалось найти пользователя с таким id',
    ALREADY_VERIFIED: 'Вы уже прошли верификацию',
}