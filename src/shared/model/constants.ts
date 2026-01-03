import type { ApiExceptionCode } from './types';

export const MAX_ID_LENGTH = 9;
export const REQUEST_LIMIT = 10;

export const mainToastClassName = 'bg-primary-dark-secondary/30! outline-none! border-none! backdrop-blur-xl!';
export const errorToastClassName = `text-primary-error! ${mainToastClassName}`;

export const ERROR_CODE_TO_MESSAGE: Record<ApiExceptionCode, string> = {
    REFERRAL_ALREADY_TAKEN: 'Кто-то уже зарегистрировался с таким id',
    REFERRAL_NOT_EXISTS: 'Не удалось найти пользователя с таким id',
    ALREADY_VERIFIED: 'Вы уже прошли верификацию',
    REQUEST_LIMIT_EXCEEDED: 'Превышен лимит запросов'
};

export const PRODUCT_EFFECT_TYPE = {
    INC: 'inc',
    DEC: 'dec',
    RESET: 'reset',
    SET: 'set'
} as const;

export const SOCKET_EVENTS = {
    PRODUCT_BUY: 'layout:product_buy',
    PRODUCT_REFUNDED: 'layout:product_refunded'
} as const;

export const PRODUCT_TYPE = {
    0: 'DEFAULT',
    1: 'DAILY',
    2: 'LADDER'
} as const;