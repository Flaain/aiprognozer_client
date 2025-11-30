import { Socket } from 'socket.io-client';

export interface SocketStore {
    socket: Socket;
    isConnected: boolean;
}