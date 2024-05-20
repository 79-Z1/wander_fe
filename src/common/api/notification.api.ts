import * as HttpRequest from '@/common/http/http-request';

import {INotification} from '../entities';

const getUserNotification = async () => {
  return await HttpRequest.get<INotification[]>('noti');
};

const pushNotification = async (userId: string, content: string, url: string) => {
  return await HttpRequest.post<INotification[]>('noti', {userId, content, url});
};

export const NotificationApi = {
  getUserNotification,
  pushNotification
};

export default NotificationApi;
