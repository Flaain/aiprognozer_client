import { isTMA, retrieveRawInitData } from '@telegram-apps/sdk-react';
import axios, { type AxiosInstance } from 'axios';

export const api = (
    isTMA()
        ? axios.create({
              baseURL: import.meta.env.VITE_SERVER_API,
              headers: {
                  Authorization: `tma ${retrieveRawInitData()}`,
                  'Content-Type': 'application/json'
              }
          })
        : null
) as AxiosInstance;