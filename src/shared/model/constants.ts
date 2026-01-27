export const ONE_DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
export const ONE_DAY_IN_SECONDS = 86400;

export const MAX_ID_LENGTH = 9;
export const REQUEST_LIMIT = 10;

export const toastClassName = 'bg-primary-dark-secondary/30! outline-none! border-none! backdrop-blur-xl! p-3!';

export const toastMainColors = `${toastClassName} text-primary-white!`;
export const toastErrorColors = `${toastClassName} text-primary-error!`;

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
