import {useEffect} from 'react';
import {Session} from 'next-auth';

import {ENUM_SOCKET_LISTENER} from '../constants/socket.enum';
import useChatState from '../hooks/use-chat-state';
import {TSocket} from '../interfaces';

export default function useChatListener(params: {socket: TSocket; session?: Session}) {
  const {socket, session} = params;
  const chatState = useChatState();

  useEffect(() => {
    socket.auth = {accessToken: session?.user.accessToken};
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
    socket.on(ENUM_SOCKET_LISTENER.UPDATE_MESSSAGES, params => {
      chatState.updateMessages(params.messages);
    });

    return () => {
      socket.off(ENUM_SOCKET_LISTENER.UPDATE_MESSSAGES);
    };
  }, []);

  return {chatState};
}
