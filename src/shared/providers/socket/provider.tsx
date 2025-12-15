import { useEffect, useState } from 'react';

import { retrieveRawInitData } from '@telegram-apps/sdk-react';
import { io } from 'socket.io-client';
import { createStore } from 'zustand';
import { useShallow } from 'zustand/shallow';

import { useUser } from '@/entities/user';

import { SOCKET_EVENTS } from '@/shared/model/constants';

import { SocketContext } from './context';
import type { SocketStore } from './types';

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const { 0: store } = useState(() => createStore<SocketStore>(() => ({ socket: null!, isConnected: false })));

    const applyProductEffect = useUser(useShallow((state) => state.actions.applyProductEffect));

    useEffect(() => {
        const socket = io(import.meta.env.VITE_SERVER_URL, {
            path: '/api/gateway',
            extraHeaders: {
                authorization: `tma ${retrieveRawInitData()}`
            }
        })

        socket.on('connect', () => store.setState({ isConnected: true }));
        socket.on('disconnect', () => store.setState({ isConnected: false }));

        socket.on(SOCKET_EVENTS.PRODUCT_BUY, applyProductEffect);

        store.setState({ socket });

        return () => {
            socket.removeAllListeners();
            socket.disconnect();

            store.setState({ socket: null!, isConnected: false });
        }
    }, []);

    return <SocketContext.Provider value={store}>{children}</SocketContext.Provider>;
};