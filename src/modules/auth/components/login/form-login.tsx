import React, {FC} from 'react';
import Link from 'next/link';
import {SubmitHandler, useForm} from 'react-hook-form';
import {ROUTES} from '@/common/configs/routes.config';
import {zodResolver} from '@hookform/resolvers/zod';

import {Button, Label} from '@/core-ui';
import Input from '@/core-ui/input';

import {cn} from '@/components/utils';

import InputPassword from '@/common/components/input-password';

import {IComponentBaseProps} from '@/common/interfaces';

import {SignInValidator} from '../../validators/sign-in.validator';

export interface IFormData {
  email: string;
  password: string;
}

const defaultValues: IFormData = {email: '', password: ''};

export type TFormLoginProps = IComponentBaseProps & {
  onSignIn?: (formData: IFormData) => void;
};

const FormLogin: FC<TFormLoginProps> = ({className, onSignIn, ...rest}) => {
  const form = useForm<IFormData>({resolver: zodResolver(SignInValidator), defaultValues});
  const {register, handleSubmit, formState} = form;
  const {errors} = formState;

  const onSubmit: SubmitHandler<IFormData> = async formData => {
    formData.email = formData.email.toLowerCase();
    onSignIn?.(formData);
  };

  return (
    <div className={cn('form-login', className)} data-testid="form-login" {...rest}>
      <form className="flex w-full flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <p className="text-xl font-extrabold">Rất vui khi gặp laị bạn</p>
        <div className="flex flex-col gap-1">
          <Label text="Email" color="dark" className="font-semibold" />
          <Input
            className={`w-full rounded-lg ${
              errors.email && 'focus:border-red-600'
            } text-gray-text-gray-400 border border-default-border p-3 text-xs md:text-sm`}
            {...register('email')}
            placeholder={'Nhập email của bạn...'}
          />
          {errors.email && <span className="text-rose-500">{errors.email?.message?.toString()}</span>}
        </div>
        <div>
          <Label text="Mật khẩu" color="dark" className="font-semibold" />
          <InputPassword restInput={register('password')} placeholder={'Nhập mật khẩu...'} errors={!!errors.password} />
          {errors.password && <span className="text-rose-500">{errors.password?.message}</span>}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">{/* <Switch /> <span>Remember me</span> */}</div>
          <Link href={ROUTES.FORGOT_PASSWORD} className="text-sm text-orange-500 hover:no-underline">
            {'Quên mật khẩu'}?
          </Link>{' '}
        </div>
        <Button className="w-full rounded-lg py-4 text-[#FCFCFC]" color="primary" variant="contained" type="submit">
          {'Đăng nhập'}
        </Button>
      </form>
    </div>
  );
};

FormLogin.displayName = 'FormLogin';

export default FormLogin;
