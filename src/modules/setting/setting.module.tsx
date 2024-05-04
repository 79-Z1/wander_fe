'use client';

import React, {FC, useEffect, useState} from 'react';
import {useSession} from 'next-auth/react';
import classNames from 'classnames';
import UserApi from '@/common/api/user.api';

import {Loading} from '@/core-ui';

import {useToast} from '@/components/ui/use-toast';

import {IComponentBaseProps} from '@/common/interfaces';

import NotFoundModule from '../not-found/not-found';

import FomSetting, {IFormData} from './components/form-setting';

export type TSettingModuleProps = IComponentBaseProps;

const SettingModule: FC<TSettingModuleProps> = ({className}) => {
  const session = useSession();
  const {toast} = useToast();
  const [defaultValues, setDefaultValues] = useState<IFormData>();

  useEffect(() => {
    async function getUserSetting() {
      const setting = await UserApi.getUserSetting();
      setDefaultValues({
        name: setting?.metadata?.name,
        email: setting?.metadata?.email,
        phoneNumber: setting?.metadata?.phoneNumber,
        dateOfBirth: setting?.metadata?.dateOfBirth,
        gender: setting?.metadata?.gender,
        address: setting?.metadata?.address,
        avatar: setting?.metadata?.avatar
      });
    }
    getUserSetting();
  }, []);

  if (!defaultValues) {
    return <Loading className="grid w-full place-items-center" />;
  }

  if (session.status === 'unauthenticated' || !session.data) {
    return <NotFoundModule />;
  }

  async function onSave(formData: IFormData) {
    if (formData.avatar) session.update({...session.data?.user, avatar: formData.avatar});
    await UserApi.updateUserSetting(formData);
    toast({
      variant: 'success',
      description: 'Lưu thay đổi thành công!!!',
      duration: 3000
    });
  }

  return (
    <div className={classNames('SettingModule', className)}>
      <FomSetting defaultValues={defaultValues} onSave={onSave} />
    </div>
  );
};

SettingModule.displayName = 'SettingModule';

export default SettingModule;
