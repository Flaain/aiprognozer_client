import { isTMA, retrieveRawInitData } from '@telegram-apps/sdk-react';
import axios from 'axios';

export const api = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    headers: {
        Authorization: `tma ${isTMA() ? retrieveRawInitData() : null}`,
        'Content-Type': 'application/json'
    }
});