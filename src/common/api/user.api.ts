import * as HttpRequest from '@/common/http/http-request';

import {IUser} from '../entities/user.entity';
import {generateQueryParams} from '../utils/generate-query-params.util';

const searchByNameNoAuth = async (name?: string) => {
  const queryParams = generateQueryParams({name: name});
  return await HttpRequest.get<IUser[]>(`user/search?${queryParams}`);
};

export const UserApi = {
  searchByNameNoAuth
};

export default UserApi;
