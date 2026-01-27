import type { ApiExceptionCode } from '@/shared/model/types';

export const ERROR_CODE_TO_MESSAGE: Record<
    Extract<ApiExceptionCode, 'REFERRAL_ALREADY_TAKEN' | 'REFERRAL_NOT_EXISTS' | 'ALREADY_VERIFIED'>,
    string
> = {
    REFERRAL_ALREADY_TAKEN: 'Кто-то уже зарегистрировался с таким id',
    REFERRAL_NOT_EXISTS: 'Не удалось найти пользователя с таким id',
    ALREADY_VERIFIED: 'Вы уже прошли верификацию'
};