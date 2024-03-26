import {SignInOptions} from 'next-auth/react';

import {ENUM_O_AUTH_PROVIDER} from '@/common/constants';

export interface IOAuthParams {
  token?: string;
}

export interface IUserAttribute {
  _id: string;
  name: string;
  email: string;
  career: string;
  gender: string;
  dateOfBirth: string;
  avatar: string;
  isActive: boolean;
  password: string;
  provider: ENUM_O_AUTH_PROVIDER;
  providerAccountId: string;
  providerMetaData: IProviderAttribute;
  updatedAt: string;
  createdAt: string;
  plan?: string;
  planExpiredDate?: string;
  slug: string;
  description?: string;
  verified: boolean;
}
export interface IProviderAttribute {
  type?: 'credentials' | 'oauth';
  access_token?: string;
  token_type?: string;
  expires_at?: number;
  id_token?: string;
  scope?: string;
}

export type AuthProvider = 'credentials' | 'facebook' | 'google';

export interface IAuthResponse {
  user: {
    _id: string;
    email: string;
    name: string;
    avatar: string;
    career: string;
    planExpiredDate?: string;
    gender: string;
    dateOfBirth: Date;
    slug: string;
    description?: string;
    isVerified?: boolean;
    provider?: ENUM_O_AUTH_PROVIDER;
  };
  accessToken: string;
  refreshToken: string;
}

export type TLoginCredential = Partial<IUserAttribute> & SignInOptions;
