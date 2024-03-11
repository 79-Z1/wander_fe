import {SignInOptions} from 'next-auth/react';

import {ENUM_O_AUTH_PROVIDER} from '@/common/constants/auth.constant';

export interface IUserAttribute {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isActive: boolean;
  password: string;
  provider: ENUM_O_AUTH_PROVIDER;
  providerAccountId: string;
  providerMetaData: IProviderAttribute;
  updatedAt: string;
  createdAt: string;
  slug: string;
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

export type TLoginCredential = Partial<IUserAttribute> & SignInOptions;
