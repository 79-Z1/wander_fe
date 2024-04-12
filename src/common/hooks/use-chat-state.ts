import {Socket} from 'socket.io-client';
import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer';

import {IInitState, IMessage} from '@/common/interfaces';

import {ENUM_SOCKET_EMIT} from '../constants/socket.enum';

interface IState extends IInitState {
  messages: IMessage[];
}

interface IActions {
  sendMessage: (roomId: string, message: string, socket: Socket) => void;
  updateMessages: (payload: IMessage[]) => void;
  setMessages: (payload: IMessage[]) => void;
  setLoading: (status: boolean) => void;
}

const useChatState = create<IState & IActions>()(
  devtools(
    immer(set => ({
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
      sendMessage: async (roomId, message, socket) => {
        try {
          socket.emit(ENUM_SOCKET_EMIT.SEND_MESSAGE, {
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
      setLoading: status => {
        set({isFetching: status}, false);
      }
    }))
  )
);

export default useChatState;
