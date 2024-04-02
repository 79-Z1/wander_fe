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
  sendFriendRequest: (friendId: string, socket: Socket) => void;
  updateFriendRecieved: (friendRecieves: IFriendRecieved[]) => void;
  getFriendForFriendPage: (tab: ENUM_FRIEND_TAB) => void;
  acceptFriendRequest: (friendId: string, socket: Socket) => void;
  rejectFriendRequest: (friendId: string, socket: Socket) => void;
  unFriend: (friendId: string, socket: Socket) => void;
  updateFriendList: (payload: IFriend[]) => void;
  updateFriendSent: (payload: IFriendSent[]) => void;
  setLoading: (status: boolean) => void;
}

const useFriendState = create<IState & IActions>()(
  devtools(
    immer((set, get) => ({
      isFetching: true,
      userFriend: {
        friends: [],
        friendsRequestSent: [],
        friendsRequestReceved: [],
        _id: '',
        friendId: ''
      } as IUserFriend,
      updateFriendSent: payload => {
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
      sendFriendRequest: async (friendId, socket) => {
        try {
          const res = await FriendApi.sendFriendRequest(friendId);
          socket.emit(ENUM_SOCKET_EMIT.SEND_FRIEND_REQUEST, {friendId});
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
      updateFriendRecieved: async friendRecieves => {
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
          socket.emit(ENUM_SOCKET_EMIT.UN_FRIEND, {friendId});
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
          let newFriendRecieved = get().userFriend.friendsRequestReceved;
          const res = await FriendApi.rejectFriendRequest(friendId);
          if (res.metadata) {
            newFriendRecieved = get().userFriend.friendsRequestReceved.filter(friend => friend.user._id !== friendId);
            socket.emit(ENUM_SOCKET_EMIT.REJECT_FRIEND_REQUEST, {friendId});
          }
          set(state => {
            state.userFriend.friendsRequestReceved = newFriendRecieved;
            state.statusCode = res.statusCode;
            state.error = res.error;
            state.message = res.message;
            state.isFetching = false;
          }, false);
        } catch (error) {
          set({isFetching: false}, false);
        }
      },
      acceptFriendRequest: async (friendId, socket) => {
        try {
          let newFriendRecieved = get().userFriend.friendsRequestReceved;
          const res = await FriendApi.acceptFriendRequest(friendId);
          if (res.metadata) {
            newFriendRecieved = get().userFriend.friendsRequestReceved.filter(friend => friend.user._id !== friendId);
            socket.emit(ENUM_SOCKET_EMIT.ACCEPT_FRIEND_REQUEST, {friendId});
          }
          set(state => {
            state.userFriend.friendsRequestReceved = newFriendRecieved;
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
        set({isFetching: status}, false, 'voucher/setLoading');
      }
    }))
  )
);

export default useFriendState;
