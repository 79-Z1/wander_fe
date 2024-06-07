import {useEffect} from 'react';
import {Session} from 'next-auth';

import {useToast} from '@/components/ui/use-toast';

import {ENUM_SOCKET_LISTENER} from '../constants/socket.enum';
import useFriendState from '../hooks/use-friend-state';
import useNotificationState from '../hooks/use-notification-state';
import {TSocket} from '../interfaces';

export default function useCommonListener(params: {socket: TSocket; session?: Session}) {
  const {socket, session} = params;
  const friendState = useFriendState();
  const notificationState = useNotificationState();
  const {toast} = useToast();

  useEffect(() => {
    socket.auth = {userId: session?.user.id};
    socket.connect();
    return () => {
      socket.disconnect();
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on('connect', () => {});

    socket.on('connect_error', () => {
      setTimeout(() => {
        socket.connect();
      }, 1000);
    });
  }, []);

  useEffect(() => {
    socket.on(ENUM_SOCKET_LISTENER.UPDATE_FRIEND_REQUEST, params => {
      friendState.updateFriendRecievedList(params);
    });
  }, []);

  useEffect(() => {
    socket.on(ENUM_SOCKET_LISTENER.UPDATE_NOTIFICATION, params => {
      notificationState.updateNotifications(params.notifications);
      toast({
        description: 'Bạn có thông báo mới',
        variant: 'success',
        duration: 3000
      });
    });
    socket.on(ENUM_SOCKET_LISTENER.UPDATE_FRIEND, param => {
      if (param.type === 'send') {
        const friendRecieved = [...friendState.userFriend.friends, param.friend];
        friendState.updateFriendRecievedList(friendRecieved);
      }
      if (param.type === 'cancel-send') {
        const friendRecieved = [...friendState.userFriend.friends, param.friend];
        friendState.updateFriendRecievedList(friendRecieved);
      }
      if (param.type === 'accept') {
        const newFriendSent = friendState.userFriend.friendsRequestSent?.filter(
          friend => friend.user._id !== param.friend.user._id
        );
        const friendList = [...friendState.userFriend.friends, param.friend];
        friendState.updateFriendList(friendList);
        friendState.updateFriendSentList(newFriendSent);
      }
      if (param.type === 'reject') {
        const newFriendSent = friendState.userFriend.friendsRequestSent?.filter(
          friend => friend.user._id !== param.friend.user._id
        );
        friendState.updateFriendSentList(newFriendSent);
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
      friendState.updateFriendRecievedList(friendRecieves);
    });

    return () => {
      socket.off(ENUM_SOCKET_LISTENER.UPDATE_FRIEND);
      socket.off(ENUM_SOCKET_LISTENER.UPDATE_FRIEND_REQUEST);
    };
  }, []);

  return {friendState};
}
