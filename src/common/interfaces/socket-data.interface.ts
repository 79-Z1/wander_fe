import {Socket} from 'socket.io-client';

import {ENUM_SOCKET_EMIT, ENUM_SOCKET_LISTENER} from '../constants/socket.enum';
import {INotification} from '../entities';

import {TJoinConversation, TSendMessage, TUpdateMessages} from './chat.interface';
import {
  IFriendRecieved,
  IUpdateFriend,
  TAcceptFriendRequest,
  TRejectFriendRequest,
  TSendFriendRequest,
  TSetUserSocketId,
  TUnFriend
} from './friend.interface';

export type TListenEvents = {
  [ENUM_SOCKET_LISTENER.UPDATE_MESSSAGES]: (param: TUpdateMessages) => void;
  [ENUM_SOCKET_LISTENER.UPDATE_FRIEND]: (param: IUpdateFriend) => void;
  [ENUM_SOCKET_LISTENER.UPDATE_FRIEND_REQUEST]: (params: IFriendRecieved[]) => void;
  [ENUM_SOCKET_LISTENER.UPDATE_NOTIFICATION]: (params: {notifications: INotification[]}) => void;
};

export type TEmitEvents = {
  [ENUM_SOCKET_EMIT.SET_USER_SOCKET_ID]: (params: TSetUserSocketId) => void;
  [ENUM_SOCKET_EMIT.SEND_MESSAGE]: (params: TSendMessage) => void;
  [ENUM_SOCKET_EMIT.JOIN_CONVERSATION]: (params: TJoinConversation) => void;
  [ENUM_SOCKET_EMIT.SEND_FRIEND_REQUEST]: (params: TSendFriendRequest) => void;
  [ENUM_SOCKET_EMIT.ACCEPT_FRIEND_REQUEST]: (params: TAcceptFriendRequest) => void;
  [ENUM_SOCKET_EMIT.REJECT_FRIEND_REQUEST]: (params: TRejectFriendRequest) => void;
  [ENUM_SOCKET_EMIT.UN_FRIEND]: (params: TUnFriend) => void;
  [ENUM_SOCKET_EMIT.PUSH_NOTIFICATION]: (params: {userId: string; content: string; url?: string}) => void;
  [ENUM_SOCKET_EMIT.MARK_AS_READ]: () => void;
};

export type TSocket = Socket<TListenEvents, TEmitEvents>;
