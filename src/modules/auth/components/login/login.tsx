import React, {FC} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {signIn} from 'next-auth/react';
import {ROUTES} from '@/common/configs/routes.config';

import {toast} from '@/components/ui/use-toast';
import {cn} from '@/components/utils';

import Line from '@/common/components/line';

import {ENUM_O_AUTH_PROVIDER} from '@/common/constants';

import {IComponentBaseProps} from '@/common/interfaces';

import logo from '@/assets/images/logo.png';

import DecorImage from '../common/decor-image';
import LoginProviders from '../common/login-providers';

import FormLogin, {IFormData} from './form-login';

export type TLoginProps = IComponentBaseProps;

const Login: FC<TLoginProps> = ({className}) => {
  const router = useRouter();

  const handleSignInGoogle = async () => {
    signIn('google', {callbackUrl: '/'});
  };

  const handleSignForm = async (formData: IFormData) => {
    const resp = await signIn(ENUM_O_AUTH_PROVIDER.CREDENTIALS, {...formData, callbackUrl: '/', redirect: false});
    if (resp?.error && JSON.parse(resp.error).status === 401) {
      toast({title: 'Đăng nhập', description: 'Email hoặc mật khẩu bạn nhập không chính xác', variant: 'destructive'});
    }
    if (resp?.url) {
      router.push(resp.url);
    }
  };

  return (
    <div className={cn('flex max-h-dvh w-full', className)} data-testid="Login">
      <DecorImage className="hidden basis-2/3 xl:block" />
      <div className="my-auto flex h-full grow flex-col justify-center gap-6 p-9">
        <div className="flex items-center gap-4">
          <Image src={logo} alt="Wander" width={48} height={48} />
          <p className="text-xl font-bold text-[#EF7A6F]">Wander</p>
        </div>
        <div className="flex flex-col gap-8">
          <FormLogin className="flex w-full flex-col items-center gap-6" onSignIn={handleSignForm} />
          <Line className="border-[#E5E5E5]" />
          <LoginProviders onSignGoogle={handleSignInGoogle} />
        </div>
        <div className="flex justify-center space-x-2 text-slate-400">
          <p>{'Bạn chưa có tài khoản'}</p>
          <Link href={ROUTES.REGISTER} className="font-semibold text-orange-500 hover:no-underline">
            {'Đăng kí'}
          </Link>
        </div>
      </div>
    </div>
  );
};

Login.displayName = 'Login';

export default Login;
