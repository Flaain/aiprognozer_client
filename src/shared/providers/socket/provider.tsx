import { useEffect, useState } from 'react';

import { retrieveRawInitData } from '@telegram-apps/sdk-react';
import { io } from 'socket.io-client';
import { createStore } from 'zustand';

import { SocketContext } from './context';
import type { SocketStore } from './types';

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const { 0: store } = useState(() => createStore<SocketStore>(() => ({
        socket: io(import.meta.env.VITE_SERVER_URL, {
            autoConnect: false,
            extraHeaders: {
                authorization: `tma ${retrieveRawInitData()}`
            }
        }),
        isConnected: false
    })));

    useEffect(() => {
        const socket = store.getState().socket;

        socket.on('connect', () => store.setState({ isConnected: true }));
        socket.on('disconnect', () => store.setState({ isConnected: false }));

        socket.connect();

        return () => {
            socket.removeAllListeners();
            socket.disconnect();
        }
    }, []);

    return <SocketContext.Provider value={store}>{children}</SocketContext.Provider>;
};