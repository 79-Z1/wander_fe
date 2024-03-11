import React, {FC} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {signIn} from 'next-auth/react';
import {ROUTES} from '@/common/configs/routes.config';

import {toast} from '@/components/ui/use-toast';
import {cn} from '@/components/utils';

import Line from '@/common/components/line';

import {ENUM_O_AUTH_PROVIDER} from '@/common/constants';

import {IComponentBaseProps} from '@/common/interfaces';

import logo from '@/assets/images/logo.png';

import AuthApi from '../../api/auth.api';
import DecorImage from '../common/decor-image';
import LoginProviders from '../common/login-providers';

import FormRegister, {IFormData} from './form-register';

export type TRegisterProps = IComponentBaseProps;

const Register: FC<TRegisterProps> = ({className}) => {
  const handleSignInGoogle = async () => {
    signIn('google', {callbackUrl: '/'});
  };

  const handleSignInFacebook = async () => {
    await signIn(ENUM_O_AUTH_PROVIDER.FACEBOOK, {callbackUrl: '/'});
  };

  const handleRegisterForm = async (formData: IFormData) => {
    try {
      formData.email = formData.email.toLowerCase();
      const {email, name, password} = formData;
      const provider = ENUM_O_AUTH_PROVIDER.CREDENTIALS;

      await AuthApi.signup({name: name, email: email, password: password, provider});

      await signIn(ENUM_O_AUTH_PROVIDER.CREDENTIALS, {email, password, callbackUrl: '/'});
    } catch (err) {
      toast({title: 'Đăng kí', description: 'Email đã tồn tại', variant: 'destructive'});
    }
  };

  return (
    <div className={cn('flex h-full w-full', className)} data-testid="Register">
      <DecorImage className="hidden basis-2/3 xl:block" />
      <div className="my-auto flex h-full grow flex-col justify-center gap-6 p-9">
        <div className="flex items-center gap-3">
          <Image src={logo} alt="Wander" width={48} height={48} />
          <p className="text-xl font-bold">Wander</p>
        </div>
        <div className="flex flex-col gap-8">
          <FormRegister className="flex w-full flex-col items-center gap-6" onSignUp={handleRegisterForm} />
          <Line className="border-[#E5E5E5]" />
          <LoginProviders onSignGoogle={handleSignInGoogle} onSignFacebook={handleSignInFacebook} />
        </div>
        <div className="flex justify-center space-x-2 text-slate-400">
          <p>{'Bạn đã có tài khoản'}</p>
          <Link href={ROUTES.LOGIN} className="font-semibold text-orange-500 hover:no-underline">
            {'Đăng nhập'}
          </Link>
        </div>
      </div>
    </div>
  );
};

Register.displayName = 'Register';

export default Register;
