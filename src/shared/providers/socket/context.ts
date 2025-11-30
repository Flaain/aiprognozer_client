import { createContext, useContext } from 'react';

import { useStore, type StoreApi } from 'zustand';

import type { SocketStore } from './types';

export const SocketContext = createContext<StoreApi<SocketStore>>(null!);

export const useSocket = <U>(selector: (state: SocketStore) => U) => {
    const store = useContext(SocketContext);

    if (!store) throw new Error('useSocket must be used within a SocketProvider');

    return useStore(store, selector);
};