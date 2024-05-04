import * as HttpRequest from '@/common/http/http-request';

import {IUser, IUserProfile} from '../entities/user.entity';
import FetchRequest from '../http/fetch-request';
import {generateQueryParams} from '../utils/generate-query-params.util';

const searchByNameNoAuth = async (name?: string) => {
  const queryParams = generateQueryParams({name: name});
  return await HttpRequest.get<IUser[]>(`user/search?${queryParams}`);
};

const getUserProfileBySlugSeverSide = async (slug: string) => {
  try {
    const res = await FetchRequest(`user/${slug}`, {cache: 'no-cache', next: {revalidate: undefined}});
    const json = await res.json();

    return json.metadata as IUserProfile;
  } catch (error) {
    return null;
  }
};

const getUserProfile = async (slug: string) => {
  return await HttpRequest.get<IUserProfile>(`user/${slug}`);
};

const getUserSetting = async () => {
  return await HttpRequest.get<IUser>('user/setting');
};

const updateUserSetting = async (data: IUser) => {
  return await HttpRequest.patch<IUser>('user', data);
};

export const UserApi = {
  getUserProfile,
  searchByNameNoAuth,
  getUserProfileBySlugSeverSide,
  getUserSetting,
  updateUserSetting
};

export default UserApi;
