import {useEffect} from 'react';
import {Session} from 'next-auth';

import {ENUM_SOCKET_EMIT, ENUM_SOCKET_LISTENER} from '../constants/socket.enum';
import useFriendState from '../hooks/use-friend-state';
import {TSocket} from '../interfaces';

// import { useSinglePlayState } from './single-play/single-play.state';

export default function useCommonListener(params: {socket: TSocket; session?: Session}) {
  const {socket, session} = params;
  const friendState = useFriendState();
  // const singlePlayState = useSinglePlayState();

  useEffect(() => {
    socket.auth = {accessToken: session?.user.accessToken};
    socket.connect();
    return () => {
      socket.disconnect();
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on('connect', () => {
      setTimeout(() => socket.emit(ENUM_SOCKET_EMIT.SET_USER_SOCKET_ID, {userId: session?.user.id}), 300);
    });

    socket.on('connect_error', () => {
      setTimeout(() => {
        socket.connect();
      }, 1000);
    });

    // socket.io.on('reconnect_attempt', () => {
    // });
  }, []);

  useEffect(() => {
    socket.on(ENUM_SOCKET_LISTENER.UPDATE_FRIEND, param => {
      if (param.type === 'accept') {
        const newFriendSent = friendState.userFriend.friendsRequestSent?.filter(
          friend => friend.user._id !== param.friend.user._id
        );
        const friendList = [...friendState.userFriend.friends, param.friend];
        friendState.updateFriendList(friendList);
        friendState.updateFriendSent(newFriendSent);
      }
      if (param.type === 'reject') {
        const newFriendSent = friendState.userFriend.friendsRequestSent?.filter(
          friend => friend.user._id !== param.friend.user._id
        );
        friendState.updateFriendSent(newFriendSent);
      }

      if (param.type === 'un-friend') {
        const newFriendList = friendState.userFriend.friends?.filter(
          friend => friend.user._id !== param.friend.user._id
        );
        friendState.updateFriendList(newFriendList);
      }
    });

    socket.on(ENUM_SOCKET_LISTENER.UPDATE_FRIEND_REQUEST, params => {
      const friendRecieves = params;
      friendState.updateFriendRecieved(friendRecieves);
    });

    return () => {
      socket.off(ENUM_SOCKET_LISTENER.UPDATE_FRIEND);
      socket.off(ENUM_SOCKET_LISTENER.UPDATE_FRIEND_REQUEST);
    };
  }, []);

  return {friendState};
}
