import {type NextAuthOptions} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';

import {AuthApi} from '../api';
import {ENUM_O_AUTH_PROVIDER} from '../constants';

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
    error: '/login'
  },
  session: {
    maxAge: 365 * 24 * 60 * 60
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      httpOptions: {
        timeout: 30000
      }
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    }),
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: {label: 'Email', type: 'email'},
        password: {label: 'Password', type: 'password'}
      },
      authorize: async function (credentials) {
        if (!credentials?.email && !credentials?.password) {
          return null;
        }

        const {email, password} = credentials;

        try {
          let signInRes;
          if (credentials?.email && credentials?.password) {
            signInRes = await AuthApi.login({email, password});
          }

          if (signInRes?.metadata.user) {
            return {
              id: signInRes.metadata.user['_id'],
              name: signInRes.metadata.user.name,
              email: signInRes.metadata.user.email,
              image: signInRes.metadata.user.avatar,
              avatar: signInRes.metadata.user.avatar,
              career: signInRes.metadata.user.career,
              gender: signInRes.metadata.user.gender,
              dateOfBirth: String(signInRes.metadata.user.dateOfBirth),
              accessToken: signInRes.metadata.accessToken,
              refreshToken: signInRes.metadata.refreshToken,
              slug: signInRes.metadata.user.slug,
              description: signInRes.metadata.user.description,
              isVerified: signInRes.metadata.user.isVerified,
              provider: signInRes.metadata.user.provider
            };
          }
        } catch (error) {
          throw new Error(JSON.stringify(error));
        }

        return null;
      }
    })
  ],
  callbacks: {
    signIn: async params => {
      const {user, account} = params;
      if (account?.provider === ENUM_O_AUTH_PROVIDER.CREDENTIALS) return !!user;

      if (!account) return false;

      if (account?.provider === ENUM_O_AUTH_PROVIDER.GOOGLE) {
        const googleResponse = await AuthApi.googleSignIn(account.id_token);
        if (googleResponse.metadata.user) {
          user.id = googleResponse.metadata.user['_id'];
          user.name = googleResponse.metadata.user.name;
          user.avatar = googleResponse.metadata.user.avatar;
          user.email = googleResponse.metadata.user.email;
          user.accessToken = googleResponse.metadata.accessToken;
          user.refreshToken = googleResponse.metadata.refreshToken;
          user.slug = googleResponse.metadata.user.slug;
          user.description = googleResponse.metadata.user.description;
          user.isVerified = googleResponse.metadata.user.isVerified;
          user.provider = ENUM_O_AUTH_PROVIDER.GOOGLE;
          return true;
        }
      }

      if (account?.provider === ENUM_O_AUTH_PROVIDER.FACEBOOK) {
        const facebookResponse = await AuthApi.facebookSignIn(account.access_token);

        if (facebookResponse.metadata.user) {
          user.id = facebookResponse.metadata.user['_id'];
          user.name = facebookResponse.metadata.user.name;
          user.avatar = facebookResponse.metadata.user.avatar;
          user.email = facebookResponse.metadata.user.email;
          user.accessToken = facebookResponse.metadata.accessToken;
          user.refreshToken = facebookResponse.metadata.refreshToken;
          user.slug = facebookResponse.metadata.user.slug;
          user.description = facebookResponse.metadata.user.description;
          user.isVerified = facebookResponse.metadata.user.isVerified;
          user.provider = ENUM_O_AUTH_PROVIDER.FACEBOOK;
          return true;
        }
      }
      return false;
    },
    jwt: async params => {
      const {user, trigger, token} = params;

      if (trigger === 'signIn' && user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.avatar = user.avatar;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.slug = user.slug;
        token.description = user.description;
        token.isVerified = user.isVerified;
        token.provider = user.provider;
      }
      return token;
    },
    session: async params => {
      const {session, token} = params;

      if (session.user && token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.avatar = token.avatar;
        session.user.career = token.career;
        session.user.gender = token.gender;
        session.user.dateOfBirth = token.dateOfBirth;
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.slug = token.slug;
        session.user.description = token.description;
        session.user.isVerified = token.isVerified;
        session.user.provider = token.provider;
      }

      return session;
    }
  }
};
