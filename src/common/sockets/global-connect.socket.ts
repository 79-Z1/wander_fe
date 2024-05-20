import {io, Socket} from 'socket.io-client';

import {TEmitEvents, TListenEvents} from '../interfaces';

const socket: Socket<TListenEvents, TEmitEvents> = io(`${process.env.NEXT_PUBLIC_API_URL}`, {
  autoConnect: false,
  secure: true,
  withCredentials: true,
  transports: ['websocket'],
  path: '/socket.io',
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5
});

export const GlobalConnectSocket = socket;
