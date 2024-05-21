'use client';
import React, {FC, useState} from 'react';
import {useRouter} from 'next/navigation';
import {ResetPasswordApi} from '@/common/api';

import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {toast} from '@/components/ui/use-toast';
import {cn} from '@/components/utils';

import {IComponentBaseProps} from '@/common/interfaces';

export type TResetPasswordFormProps = IComponentBaseProps & {
  token: string;
};

const ResetPasswordForm: FC<TResetPasswordFormProps> = ({className, token}) => {
  const router = useRouter();
  const [error, setError] = useState({
    emtpyPassword: false,
    emptyRepeatPassword: false,
    notMatch: false
  });
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');

  async function handleSubmit() {
    try {
      if (!password.trim() || !repeatPassword.trim()) {
        setError({emtpyPassword: !password, emptyRepeatPassword: !repeatPassword, notMatch: false});
        return;
      }
      if (password.trim() !== repeatPassword.trim()) {
        setError({emtpyPassword: false, emptyRepeatPassword: false, notMatch: true});
        return;
      }

      setError({emtpyPassword: false, emptyRepeatPassword: false, notMatch: false});
      await ResetPasswordApi.resetPassword(password.trim(), token);
      toast({title: 'Thay đổi mật khẩu thành công!', description: 'Vui lòng đăng nhập lại', variant: 'success'});
      router.push('/login');
    } catch (error) {
      toast({title: 'Có gì đó không đúng!', description: 'Vui lòng thử lại sau', variant: 'destructive'});
    }
  }
  return (
    <div className={cn('ResetPasswordForm mx-auto  w-full max-w-md p-6', className)} data-testid="ResetPasswordForm">
      <div className="mt-7 rounded-xl  border-2 border-indigo-300 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Thay đổi mật khẩu</h1>
          </div>

          <div className="mt-5">
            <form>
              <div className="grid gap-y-4">
                <div>
                  <Label htmlFor="password" className="mb-2 ml-1 block text-sm font-bold dark:text-white">
                    Nhập mật khẩu
                  </Label>
                  <div className="relative">
                    <Input
                      type="password"
                      name="password"
                      className="block w-full rounded-md border-2 border-gray-200 px-4 py-3 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      aria-describedby="email-error"
                    />
                  </div>
                  {error.emtpyPassword && (
                    <p className="mt-2 text-xs text-red-600" id="email-error">
                      * Không được để trống mục này
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="repeatPassword" className="mb-2 ml-1 block text-sm font-bold dark:text-white">
                    Nhập lại mật khẩu
                  </Label>
                  <div className="relative">
                    <Input
                      type="password"
                      name="repeatPassword"
                      className="block w-full rounded-md border-2 border-gray-200 px-4 py-3 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      value={repeatPassword}
                      onChange={e => setRepeatPassword(e.target.value)}
                      aria-describedby="email-error"
                    />
                  </div>
                  {error.emptyRepeatPassword && (
                    <p className="mt-2 text-xs text-red-600" id="email-error">
                      * Không được để trống mục này
                    </p>
                  )}
                  {error.notMatch && (
                    <p className="mt-2 text-xs text-red-600" id="email-error">
                      * Mật khẩu không khớp
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                  onClick={handleSubmit}
                >
                  Tiếp tục
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

ResetPasswordForm.displayName = 'ResetPasswordForm';

export default ResetPasswordForm;
