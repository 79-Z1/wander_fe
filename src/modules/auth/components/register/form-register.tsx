import React, {FC} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

import {Button, Label} from '@/core-ui';
import Input from '@/core-ui/input';

import {cn} from '@/components/utils';

import InputPassword from '@/common/components/input-password';

import {IComponentBaseProps} from '@/common/interfaces';

import {SignUpValidator} from '../../validators/sign-up.validator';

export interface IFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const defaultValues: IFormData = {name: '', email: '', password: '', confirmPassword: ''};

export type TFormRegisterProps = IComponentBaseProps & {
  onSignUp?: (formData: IFormData) => void;
};

const FormRegister: FC<TFormRegisterProps> = ({className, onSignUp, ...rest}) => {
  const form = useForm<IFormData>({resolver: zodResolver(SignUpValidator), defaultValues});
  const {register, handleSubmit, formState} = form;
  const {errors} = formState;

  const onSubmit: SubmitHandler<IFormData> = async formData => {
    onSignUp?.(formData);
  };

  return (
    <div className={cn('form-Register', className)} data-testid="form-Register" {...rest}>
      <form className="flex w-full flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <p className="text-xl font-extrabold">Chào mừng bạn đến với chúng tôi</p>
        <div className="flex flex-col gap-1">
          <Label text="Họ và tên" color="dark" className="font-semibold" />
          <Input
            className={`w-full rounded-lg ${
              errors.name && 'focus:border-red-600'
            } text-gray-text-gray-400 border border-default-border p-3 text-xs md:text-sm`}
            {...register('name')}
            placeholder={'Nhập họ và tên của bạn...'}
          />
          {errors.email && <span className="text-rose-500">{errors.email?.message?.toString()}</span>}
        </div>
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
        <div>
          <Label text="Nhập lại mật khẩu" color="dark" className="font-semibold" />
          <InputPassword
            restInput={register('confirmPassword')}
            placeholder={'Nhập lại mật khẩu...'}
            errors={!!errors.password}
          />
          {errors.password && <span className="text-rose-500">{errors.password?.message}</span>}
        </div>
        <Button className="w-full rounded-lg py-4 text-[#FCFCFC]" color="primary" variant="contained" type="submit">
          {'Đăng kí'}
        </Button>
      </form>
    </div>
  );
};

FormRegister.displayName = 'FormRegister';

export default FormRegister;
