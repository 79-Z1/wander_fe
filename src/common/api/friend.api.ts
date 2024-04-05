import * as HttpRequest from '@/common/http/http-request';

import {ENUM_FRIEND_TAB} from '../constants';
import {IFriend, IFriendRecieved, IFriendSent, IUserFriend} from '../interfaces/friend.interface';
import {generateQueryParams} from '../utils/generate-query-params.util';

const sendFriendRequest = async (friendId: string) => {
  return await HttpRequest.patch<IFriendSent[]>('friend/send-request', {friendId});
};

const cancelFriendRequest = async (friendId: string) => {
  return await HttpRequest.patch<IFriendSent[]>('friend/remove-request', {friendId});
};

const getFriendForFriendPage = (tab?: ENUM_FRIEND_TAB) => {
  const queryParams = generateQueryParams({tab});

  return HttpRequest.get<IUserFriend>(`friend?${queryParams}`);
};

const acceptFriendRequest = async (friendId: string) => {
  return await HttpRequest.patch<IFriendRecieved[]>('friend/accept', {friendId});
};

const rejectFriendRequest = async (friendId: string) => {
  return await HttpRequest.patch<IFriendRecieved[]>('friend/reject', {friendId});
};

const unFriend = async (friendId: string) => {
  return await HttpRequest.patch<IFriend[]>('friend/unfriend', {friendId});
};

export const FriendApi = {
  sendFriendRequest,
  cancelFriendRequest,
  getFriendForFriendPage,
  acceptFriendRequest,
  rejectFriendRequest,
  unFriend
};

export default FriendApi;
