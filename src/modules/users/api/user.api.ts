import {API_ENDPOINTS} from '@/common/constants/api-endpoint.constant';

import {IAxiosResponse} from '../../../common/http/axios-types';
import * as HttpRequest from '../../../common/http/http-request';
import {CreateUserDto} from '../dto/create-user.dto';
import {IUserAttribute} from '../entities/user.entity';

const create = (data: CreateUserDto) => HttpRequest.post<IAxiosResponse<IUserAttribute>>(`${API_ENDPOINTS.USER}`, data);

export {create};

export const UserApi = {
  create
};

export default UserApi;
