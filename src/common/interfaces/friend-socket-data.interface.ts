import {Socket} from 'socket.io-client';

import {ENUM_SOCKET_EMIT, ENUM_SOCKET_LISTENER} from '../constants/socket.enum';

import {IFriendRecieved, IUpdateFriend} from './friend.interface';

export type TSendFriendRequest = {friendId: string};
export type TAcceptFriendRequest = {friendId: string};
export type TRejectFriendRequest = {friendId: string};
export type TUnFriend = {friendId: string};
export type TSetUserSocketId = {userId?: string};

export type TListenEvents = {
  [ENUM_SOCKET_LISTENER.UPDATE_FRIEND]: (param: IUpdateFriend) => void;
  [ENUM_SOCKET_LISTENER.UPDATE_FRIEND_REQUEST]: (params: IFriendRecieved[]) => void;
};

export type TEmitEvents = {
  [ENUM_SOCKET_EMIT.SET_USER_SOCKET_ID]: (params: TSetUserSocketId) => void;
  [ENUM_SOCKET_EMIT.SEND_FRIEND_REQUEST]: (params: TSendFriendRequest) => void;
  [ENUM_SOCKET_EMIT.ACCEPT_FRIEND_REQUEST]: (params: TAcceptFriendRequest) => void;
  [ENUM_SOCKET_EMIT.REJECT_FRIEND_REQUEST]: (params: TRejectFriendRequest) => void;
  [ENUM_SOCKET_EMIT.UN_FRIEND]: (params: TUnFriend) => void;
};

export type TSocket = Socket<TListenEvents, TEmitEvents>;
