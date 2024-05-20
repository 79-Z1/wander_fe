import React, {FC, useState} from 'react';
import Image from 'next/image';
import {SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {PutBlobResult} from '@vercel/blob';

import {DatePicker, Label} from '@/core-ui';
import Input from '@/core-ui/input';

import {Button} from '@/components/ui/button';
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {cn} from '@/components/utils';

import {IComponentBaseProps} from '@/common/interfaces';

import {SettingValidator} from '../validators/setting.validator';

export type TFomSettingProps = IComponentBaseProps & {
  defaultValues?: IFormData;
  onSave?: SubmitHandler<IFormData>;
};

export interface IFormData {
  name?: string;
  email?: string;
  phoneNumber?: string;
  dateOfBirth?: Date;
  gender?: string;
  address?: string;
  avatar?: string;
}

const FomSetting: FC<TFomSettingProps> = ({className, defaultValues, onSave}) => {
  const form = useForm<IFormData>({resolver: zodResolver(SettingValidator), defaultValues});
  const {register, handleSubmit, formState} = form;
  const {errors} = formState;

  const [gender, setGender] = useState(defaultValues?.gender || '');
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(defaultValues?.dateOfBirth);
  const [avatar, setAvatar] = useState<string>(defaultValues?.avatar || '/images/avatar.png');

  const onSubmit: SubmitHandler<IFormData> = async formData => {
    formData.email = formData?.email?.toLowerCase();
    formData.gender = gender;
    formData.dateOfBirth = dateOfBirth;
    formData.avatar = avatar;
    onSave?.(formData);
  };

  const handleDateChange = (date: Date) => {
    setDateOfBirth(date);
  };

  const handleUpFile = async (file: File) => {
    const response = await fetch(`/api/avatar/upload?filename=${file.name}`, {
      method: 'POST',
      body: file
    });

    const newImage = (await response.json()) as PutBlobResult;

    setAvatar(newImage.url);
  };

  return (
    <div className={cn('FomSetting', className)} data-testid="FomSetting">
      <form className="flex w-full flex-col gap-3 lg:gap-6" onSubmit={handleSubmit(onSubmit)}>
        <p className="text-center text-xl font-extrabold">Cài đặt</p>
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="relative h-[118px] w-[118px] lg:h-[150px] lg:w-[150px]">
            <Image
              fill
              src={avatar}
              className="absolute rounded-full bg-black object-cover object-center"
              alt="avatar"
            />
          </div>
          <div>
            <input
              type="file"
              id="fileInput"
              className="hidden"
              accept="image/*"
              onChange={e => handleUpFile(e.target.files?.[0] as File)}
            />
            <label htmlFor="fileInput" className="cursor-pointer font-bold text-orange-500 hover:text-orange-600">
              Tải ảnh lên
            </label>
          </div>
        </div>
        <div className="grid gap-3 lg:lg:grid-cols-2 lg:gap-6">
          <div className="flex flex-col gap-1">
            <Label text="Họ và tên" color="dark" className="font-semibold" />
            <Input
              className={`w-full rounded-lg ${
                errors.name && 'focus:border-red-600'
              } text-gray-text-gray-400 border border-default-border p-3 text-xs md:text-sm`}
              placeholder={'Nhập họ và tên của bạn...'}
              {...register('name')}
            />
            {errors.name && <span className="text-rose-500">{errors.name?.message?.toString()}</span>}
          </div>
          <div className="flex flex-col gap-1">
            <Label text="Email" color="dark" className="font-semibold" />
            <Input
              className={`w-full rounded-lg ${
                errors.email && 'focus:border-red-600'
              } text-gray-text-gray-400 border border-default-border p-3 text-xs md:text-sm`}
              placeholder={'Nhập email của bạn...'}
              {...register('email')}
            />
            {errors.email && <span className="text-rose-500">{errors.email?.message?.toString()}</span>}
          </div>
        </div>
        <div className="grid gap-3 lg:grid-cols-2 lg:gap-6">
          <div className="flex flex-col gap-1">
            <Label text="Số điện thoại" color="dark" className="font-semibold" />
            <Input
              className={`w-full rounded-lg ${
                errors.phoneNumber && 'focus:border-red-600'
              } text-gray-text-gray-400 border border-default-border p-3 text-xs md:text-sm`}
              placeholder={'Nhập số điện thoại của bạn...'}
              {...register('phoneNumber')}
            />
            {errors.phoneNumber && <span className="text-rose-500">{errors.phoneNumber?.message?.toString()}</span>}
          </div>
          <div className="flex flex-col gap-1">
            <Label text="Địa chỉ" color="dark" className="font-semibold" />
            <Input
              className={`w-full rounded-lg ${
                errors.address && 'focus:border-red-600'
              } text-gray-text-gray-400 border border-default-border p-3 text-xs md:text-sm`}
              placeholder={'Nhập địa chỉ của bạn...'}
              {...register('address')}
            />
            {errors.address && <span className="text-rose-500">{errors.address?.message?.toString()}</span>}
          </div>
        </div>
        <div className="grid gap-3 lg:grid-cols-2 lg:gap-6">
          <div className="flex flex-col gap-1">
            <Label text="Ngày sinh" color="dark" className="font-semibold" />
            <DatePicker
              defaultValue={dateOfBirth}
              className="w-full rounded-lg border border-default-border bg-white p-3 text-xs md:text-sm"
              onChange={handleDateChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label text="Giới tính" color="dark" className="font-semibold" />
            <Select defaultValue={gender} onValueChange={gender => setGender(gender)}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Chọn giới tính" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="male">Nam</SelectItem>
                  <SelectItem value="female">Nữ</SelectItem>
                  <SelectItem value="other">Khác</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button type="submit" className="hover:bg-orange-600">
          Lưu thay đổi
        </Button>
      </form>
    </div>
  );
};

FomSetting.displayName = 'FomSetting';

export default FomSetting;
