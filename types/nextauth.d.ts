import {DefaultSession} from 'next-auth';
import {UserRole} from '@/common/entities/user.entity';

import {ENUM_O_AUTH_PROVIDER, ENUM_PLAN, ENUM_PLAN_DURATION} from '@/common/constants';

declare module 'next-auth' {
  interface User {
    id: string;
    name: string;
    email: string;
    slug: string;
    image: string; //TODO ?
    avatar: string;
    career: string;
    gender: string;
    dateOfBirth: string;
    description?: string;
    accessToken: string;
    refreshToken: string;
    isVerified?: boolean;
    provider?: ENUM_O_AUTH_PROVIDER;
    role?: UserRole;
    isActive?: boolean;
  }

  interface Account {
    id_token: string;
    access_token: string;
  }

  interface Profile {
    iss: string;
    azp: string;
    aud: string;
    sub: string;
    email: string;
    email_verified: string;
    at_hash: string;
    name: string;
    picture: string;
    given_name: string;
    family_name: string;
    locale: string;
    iat: string;
    exp: string;
    alg: string;
    kid: string;
    typ: string;
  }

  interface Session extends DefaultSession {
    user: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    name: string;
    email: string;
    image: string; //TODO ?
    avatar: string;
    career: string;
    plan: ENUM_PLAN;
    planDuration?: ENUM_PLAN_DURATION;
    planExpiredDate?: string;
    gender: string;
    dateOfBirth: string;
    accessToken: string;
    refreshToken: string;
    slug: string;
    description?: string;
    isVerified?: boolean;
    provider?: ENUM_O_AUTH_PROVIDER;
    role?: UserRole;
    isActive?: boolean;
  }
}
