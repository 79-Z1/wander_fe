import {Socket} from 'socket.io-client';
import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer';

import {IInitState} from '@/common/interfaces';

import FriendApi from '../api/friend.api';
import {ENUM_FRIEND_TAB} from '../constants';
import {ENUM_SOCKET_EMIT} from '../constants/socket.enum';
import {IFriend, IFriendRecieved, IFriendSent, IUserFriend} from '../interfaces/friend.interface';

interface IState extends IInitState {
  userFriend: IUserFriend;
}

interface IActions {
  sendFriendRequest: (userId: string, friendId: string, socket: Socket) => void;
  cancelFriendRequest: (userId: string, friendId: string, socket: Socket) => void;
  updateFriendRecievedList: (friendRecieves: IFriendRecieved[]) => void;
  getFriendForFriendPage: (tab: ENUM_FRIEND_TAB) => void;
  acceptFriendRequest: (userId: string, friendId: string, socket: Socket) => void;
  rejectFriendRequest: (friendId: string, socket: Socket) => void;
  unFriend: (friendId: string, socket: Socket) => void;
  updateFriendList: (payload: IFriend[]) => void;
  updateFriendSentList: (payload: IFriendSent[]) => void;
  setLoading: (status: boolean) => void;
}

const useFriendState = create<IState & IActions>()(
  devtools(
    immer(set => ({
      isFetching: true,
      userFriend: {
        friends: [],
        friendsRequestSent: [],
        friendsRequestReceved: [],
        _id: '',
        friendId: ''
      } as IUserFriend,
      updateFriendSentList: payload => {
        try {
          set(state => {
            state.userFriend.friendsRequestSent = payload;
            state.isFetching = false;
          }, false);
        } catch (error) {
          set({isFetching: false}, false);
        }
      },
      updateFriendList: payload => {
        try {
          set(state => {
            state.userFriend.friends = payload;
            state.statusCode = 200;
            state.error = false;
            state.message = 'Update friends success';
            state.isFetching = false;
          }, false);
        } catch (error) {
          set({isFetching: false}, false);
        }
      },
      sendFriendRequest: async (userId, friendId, socket) => {
        try {
          const res = await FriendApi.sendFriendRequest(friendId);
          if (res.metadata) {
            socket.emit(ENUM_SOCKET_EMIT.SEND_FRIEND_REQUEST, {friendId, userId});
          }
          set(state => {
            state.userFriend.friendsRequestSent = res.metadata;
            state.statusCode = res.statusCode;
            state.error = res.error;
            state.message = res.message;
            state.isFetching = false;
          }, false);
        } catch (error) {
          set({isFetching: false}, false);
        }
      },
      cancelFriendRequest: async (userId, friendId, socket) => {
        try {
          const res = await FriendApi.cancelFriendRequest(friendId);
          if (res.metadata) {
            socket.emit(ENUM_SOCKET_EMIT.CANCEL_FRIEND_REQUEST, {friendId, userId});
          }
          set(state => {
            state.userFriend.friendsRequestSent = res.metadata;
            state.statusCode = res.statusCode;
            state.error = res.error;
            state.message = res.message;
            state.isFetching = false;
          }, false);
        } catch (error) {
          set({isFetching: false}, false);
        }
      },
      updateFriendRecievedList: async friendRecieves => {
        try {
          set(state => {
            state.userFriend.friendsRequestReceved = friendRecieves;
            state.isFetching = false;
          }, false);
        } catch (error) {
          set({isFetching: false}, false);
        }
      },
      unFriend: async (friendId, socket) => {
        try {
          const res = await FriendApi.unFriend(friendId);
          if (res.metadata) {
            socket.emit(ENUM_SOCKET_EMIT.UN_FRIEND, {friendId});
          }
          set(state => {
            state.userFriend.friends = res.metadata;
            state.statusCode = res.statusCode;
            state.error = res.error;
            state.message = res.message;
            state.isFetching = false;
          }, false);
        } catch (error) {
          set({isFetching: false}, false);
        }
      },
      getFriendForFriendPage: async tab => {
        try {
          const res = await FriendApi.getFriendForFriendPage(tab);
          set(state => {
            state.userFriend = res.metadata;
            state.statusCode = res.statusCode;
            state.error = res.error;
            state.message = res.message;
            state.isFetching = false;
          }, false);
        } catch (error) {
          set({isFetching: false}, false);
        }
      },
      rejectFriendRequest: async (friendId, socket) => {
        try {
          const res = await FriendApi.rejectFriendRequest(friendId);
          if (res.metadata) {
            socket.emit(ENUM_SOCKET_EMIT.REJECT_FRIEND_REQUEST, {friendId});
          }
          set(state => {
            state.userFriend.friendsRequestReceved = res.metadata;
            state.statusCode = res.statusCode;
            state.error = res.error;
            state.message = res.message;
            state.isFetching = false;
          }, false);
        } catch (error) {
          set({isFetching: false}, false);
        }
      },
      acceptFriendRequest: async (userId, friendId, socket) => {
        try {
          const res = await FriendApi.acceptFriendRequest(friendId);
          if (res.metadata) {
            socket.emit(ENUM_SOCKET_EMIT.ACCEPT_FRIEND_REQUEST, {friendId, userId});
          }
          set(state => {
            state.userFriend.friendsRequestReceved = res.metadata;
            state.statusCode = res.statusCode;
            state.error = res.error;
            state.message = res.message;
            state.isFetching = false;
          }, false);
        } catch (error) {
          set({isFetching: false}, false);
        }
      },
      setLoading: status => {
        set({isFetching: status}, false);
      }
    }))
  )
);

export default useFriendState;
