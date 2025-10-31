import { retrieveRawInitData } from '@telegram-apps/sdk-react';
import axios from 'axios';

export * from './error';

export const api = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    headers: {
        Authorization: `tma ${retrieveRawInitData()}`,
        'Content-Type': 'application/json'
    }
});