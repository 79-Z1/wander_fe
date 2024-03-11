import {signIn, SignInOptions, signOut} from 'next-auth/react';
import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer';

import * as API from '@/modules/users/api/user.api';
import {CreateUserDto} from '@/modules/users/dto/create-user.dto';
import {TLoginCredential} from '@/modules/users/entities/user.entity';

import {ENUM_O_AUTH_PROVIDER} from '@/common/constants';

import {getErrorMessage} from '@/common/utils/error.util';

import {IInitState} from '@/common/interfaces';

type IState = IInitState;

interface IActions {
  login: (credentials: TLoginCredential) => void;
  googleSignIn: (options: SignInOptions) => void;
  facebookSignIn: (options: SignInOptions) => void;
  signup: (userDto: CreateUserDto) => void;
  logout: (callbackUrl?: string) => void;
  resetSignUp: () => void;
}

export const useAuthState = create<IState & IActions>()(
  devtools(
    immer(set => ({
      login: async credentials => {
        try {
          set({isLogging: true});
          const res = await signIn(ENUM_O_AUTH_PROVIDER.CREDENTIALS, credentials);
          set({isLogging: false, error: res?.error});
        } catch (error) {
          set({isLogging: false, error: error});
        }
      },
      googleSignIn: async options => {
        await signIn(ENUM_O_AUTH_PROVIDER.GOOGLE, options);
      },
      facebookSignIn: async options => {
        await signIn(ENUM_O_AUTH_PROVIDER.FACEBOOK, options);
      },
      signup: async userDto => {
        set({isCreating: true}, false, 'auth/signupRequest');
        try {
          await API.create(userDto);
          set({isCreating: false, error: null}, false, 'auth/signupSuccess');
        } catch (error: unknown) {
          set({isCreating: false, message: getErrorMessage(error), error: error}, false, 'auth/signupFailure');
        }
      },
      logout: (callbackUrl = '/') => {
        signOut({redirect: true, callbackUrl});
      },
      resetSignUp: () => {
        set({isCreating: undefined, error: null});
      }
    })),
    {enabled: process.env.NODE_ENV === 'development'}
  )
);
