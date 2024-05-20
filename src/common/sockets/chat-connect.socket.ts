import {io, Socket} from 'socket.io-client';

import {TEmitEvents, TListenEvents} from '../interfaces';

const socket: Socket<TListenEvents, TEmitEvents> = io(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
  autoConnect: false,
  secure: true,
  withCredentials: true,
  transports: ['websocket'],
  path: '/socket.io'
});

export const ChatConnectSocket = socket;
