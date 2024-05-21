'use client';
import React, {FC, useState} from 'react';
import Link from 'next/link';
import {ResetPasswordApi} from '@/common/api';

import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {cn} from '@/components/utils';

import {IComponentBaseProps} from '@/common/interfaces';

export type TForgotPassWordModuleProps = IComponentBaseProps;

const ForgotPassWordModule: FC<TForgotPassWordModuleProps> = ({className}) => {
  const [error, setError] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');

  async function handleSubmit() {
    try {
      const resp = await ResetPasswordApi.sendResetPasswordRequest(email);
      if (!resp.metadata) {
        setError(true);
      }
    } catch (error) {
      setError(true);
    }
  }
  return (
    <div
      className={cn('ForgotPassWordModule mx-auto w-full max-w-md p-6', className)}
      data-testid="ForgotPassWordModule"
    >
      <div className="mt-7 rounded-xl  border-2 border-indigo-300 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Quên mật khẩu?</h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Bạn đã nhớ mật khẩu?
              <Link className="ml-1 font-medium text-blue-600 decoration-2 hover:underline" href={'/login'}>
                Đăng nhập
              </Link>
            </p>
          </div>

          <div className="mt-5">
            <form>
              <div className="grid gap-y-4">
                <div>
                  <Label htmlFor="email" className="mb-2 ml-1 block text-sm font-bold dark:text-white">
                    Địa chỉ email
                  </Label>
                  <div className="relative">
                    <Input
                      type="email"
                      className="block w-full rounded-md border-2 border-gray-200 px-4 py-3 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      aria-describedby="email-error"
                    />
                  </div>
                  {error && (
                    <p className="mt-2 text-xs text-red-600" id="email-error">
                      * Địa chỉ email không hợp lệ hoặc không tồn tại
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

ForgotPassWordModule.displayName = 'ForgotPassWordModule';

export default ForgotPassWordModule;
