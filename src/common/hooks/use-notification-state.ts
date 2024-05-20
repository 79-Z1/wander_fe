import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer';

import {IInitState} from '@/common/interfaces';

import NotificationApi from '../api/notification.api';
import {INotification} from '../entities';

interface IState extends IInitState {
  notifications: INotification[];
  countNewNotification: number;
}

interface IActions {
  updateNotifications: (payload: INotification[]) => void;
  getNotifications: () => void;
}

const useNotificationState = create<IState & IActions>()(
  devtools(
    immer(set => ({
      isFetching: true,
      countNewNotification: 0,
      notifications: [],
      updateNotifications: payload => {
        try {
          const newNotifications = payload.filter(notification => !notification.seen);
          set(state => {
            state.notifications = payload;
            state.countNewNotification = newNotifications.length;
            state.isFetching = false;
          }, false);
        } catch (error) {
          set({isFetching: false}, false);
        }
      },
      getNotifications: async () => {
        try {
          const res = await NotificationApi.getUserNotification();
          const newNotifications = res.metadata.filter(notification => !notification.seen);
          set(state => {
            state.notifications = res.metadata;
            state.countNewNotification = newNotifications.length;
            state.isFetching = false;
          }, false);
        } catch (error) {
          set({isFetching: false}, false);
        }
      }
    }))
  )
);

export default useNotificationState;
