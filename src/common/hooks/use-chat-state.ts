import {Socket} from 'socket.io-client';
import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer';

import {IInitState, IMessage} from '@/common/interfaces';

import {ENUM_SOCKET_EMIT} from '../constants/socket.enum';

interface IState extends IInitState {
  chatRoomId: string;
  messages: IMessage[];
}

interface IActions {
  setChatRoomId: (chatRoomId: string) => void;
  sendMessage: (userId: string, roomId: string, message: string, socket: Socket) => void;
  updateMessages: (payload: IMessage[]) => void;
  setMessages: (payload: IMessage[]) => void;
  setLoading: (status: boolean) => void;
}

const useChatState = create<IState & IActions>()(
  devtools(
    immer(set => ({
      chatRoomId: '',
      isFetching: true,
      messages: [],
      updateMessages: payload => {
        try {
          set(state => {
            state.messages = payload;
            state.isFetching = false;
          }, false);
        } catch (error) {
          set({isFetching: false}, false);
        }
      },
      sendMessage: async (userId, roomId, message, socket) => {
        try {
          socket.emit(ENUM_SOCKET_EMIT.SEND_MESSAGE, {
            userId,
            conversationId: roomId,
            message: message
          });
          set(state => {
            state.isFetching = false;
          }, false);
        } catch (error) {
          set({isFetching: false}, false);
        }
      },
      setMessages: payload => {
        try {
          set(state => {
            state.messages = payload;
            state.isFetching = false;
          }, false);
        } catch (error) {
          set({isFetching: false}, false);
        }
      },
      setChatRoomId: chatRoomId => {
        set({chatRoomId}, false);
      },
      setLoading: status => {
        set({isFetching: status}, false);
      }
    }))
  )
);

export default useChatState;
