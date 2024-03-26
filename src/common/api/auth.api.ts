import {API_ENDPOINTS} from '@/common/configs/endpoint.config';
import {IAuthResponse} from '@/common/entities/auth.entity';

import {TLoginCredential} from '@/modules/users/entities/user.entity';

import * as HttpRequest from '@/common/http/http-request';

const login = (credential: TLoginCredential) => {
  return HttpRequest.post<IAuthResponse>(API_ENDPOINTS.LOGIN, credential);
};

const googleSignIn = (token: string) => {
  return HttpRequest.post<IAuthResponse>(API_ENDPOINTS.LOGIN_GOOGLE, {token});
};

const facebookSignIn = (token: string) => {
  return HttpRequest.post<IAuthResponse>(API_ENDPOINTS.LOGIN_FACEBOOK, {token});
};

export const AuthApi = {facebookSignIn, googleSignIn, login};

export default AuthApi;
