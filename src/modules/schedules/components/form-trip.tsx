import React, {FC, useEffect, useState} from 'react';
import {DateRange} from 'react-day-picker';
import {SubmitHandler, useForm} from 'react-hook-form';
import FriendApi from '@/common/api/friend.api';
import {ILocation, IMember, IPlan} from '@/common/entities';
import {IUser} from '@/common/entities/user.entity';
import {zodResolver} from '@hookform/resolvers/zod';
import type {PutBlobResult} from '@vercel/blob';

import {DateRangePicker, Icon, Label} from '@/core-ui';
import Input from '@/core-ui/input';
import Textarea from '@/core-ui/textarea';

import {cn} from '@/components/utils';

import DateTimePicker from '@/common/components/date-time-picker/date-time-picker';
import Map from '@/common/components/map/map';
import UploadImageSection from '@/common/components/upload-image/upload-image-section';

import {IComponentBaseProps} from '@/common/interfaces';

import FriendsSuggestion from '../../../common/components/friends-suggestion';
import {CreateTripValidator} from '../validators/trip.validator';

export interface IFormData {
  _id?: string;
  topic: string;
  total: number;
  description: string;
  imageUrl: string;
  startDate?: Date;
  endDate?: Date;
  members: IUser[] | IMember[];
  plans?: IPlan[];
}

export type TFormTripProps = IComponentBaseProps & {
  defaultValues?: IFormData;
  onSubmit?: (formData: IFormData) => void;
};

const FormTrip: FC<TFormTripProps> = ({className, defaultValues, onSubmit, ...rest}) => {
  const form = useForm<IFormData>({resolver: zodResolver(CreateTripValidator), defaultValues});
  const {register, handleSubmit, formState, setValue, clearErrors} = form;
  const {errors} = formState;

  const [memberList, setMemberList] = useState<IUser[] | IMember[]>(defaultValues?.members || []);
  const [friendList, setFriendList] = useState<IUser[]>([]);
  const [planList, setPlanList] = useState<IPlan[]>(defaultValues?.plans || []);
  const [mainImageUrl, setMainImageUrl] = useState<string>(defaultValues?.imageUrl || '');
  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    defaultValues?.startDate && defaultValues?.endDate
      ? {from: defaultValues?.startDate, to: defaultValues?.endDate}
      : undefined
  );

  useEffect(() => {
    const getFriendList = async () => {
      try {
        const response = await FriendApi.getFriendList();
        setFriendList(response.metadata || []);
      } catch (error) {
        error;
      }
    };
    getFriendList();
  }, []);

  const handleUpFile = async (file: File) => {
    const response = await fetch(`/api/avatar/upload?filename=${file.name}`, {
      method: 'POST',
      body: file
    });

    const newImage = (await response.json()) as PutBlobResult;

    setMainImageUrl(newImage.url);
  };
  const handleDateRangeChange = (newDateRange: DateRange) => {
    if (newDateRange) {
      form.setValue('startDate', newDateRange.from!);
      form.setValue('endDate', newDateRange.to!);
      setDateRange(newDateRange);
    }
  };

  function handleClickFriendAvatar(selectedMembers?: IUser[]) {
    setMemberList(selectedMembers || []);
  }

  function handleAddPlan() {
    setPlanList([...planList, {} as IPlan]);
  }

  function handleChangePlanName(index: number, name: string) {
    const newPlanList = [...planList];
    newPlanList[index].title = name;
    setPlanList(newPlanList);
    name !== ''.trim() && clearErrors(`plans.${index}.title`);
  }

  function handleChangePlanCost(index: number, cost: number) {
    const newPlanList = [...planList];
    newPlanList[index].cost = cost;
    setValue(`plans.${index}.cost`, cost);
    setPlanList(newPlanList);
  }

  function handleChangePlanAddress(index: number, address: string) {
    const newPlanList = [...planList];
    newPlanList[index].address = address;
    setPlanList(newPlanList);
    address !== ''.trim() && clearErrors(`plans.${index}.address`);
  }

  function handleChangePlanStartAt(index: number, startAt: Date) {
    const newPlanList = [...planList];
    newPlanList[index].startAt = startAt.toString();
    setPlanList(newPlanList);
    setValue(`plans.${index}.startAt`, startAt.toString());
    clearErrors(`plans.${index}.startAt`);
  }

  async function handleChangePlanImage(index: number, file: File) {
    const response = await fetch(`/api/avatar/upload?filename=${file.name}`, {
      method: 'POST',
      body: file
    });

    const newImage = (await response.json()) as PutBlobResult;
    const newPlanList = [...planList];
    newPlanList[index].imageUrl = newImage.url;
    setValue(`plans.${index}.imageUrl`, newImage.url);
    setPlanList(newPlanList);
  }

  async function handleChangePlanLocation(index: number, location: ILocation) {
    const newPlanList = [...planList];
    newPlanList[index].location = location;
    setValue(`plans.${index}.location`, location);
    setPlanList(newPlanList);
  }

  function handleSearchAddress(index: number, searchResult: any) {
    if (searchResult) {
      handleChangePlanAddress(index, searchResult.location.label);
      handleChangePlanLocation(index, {
        lat: searchResult.location.y,
        lng: searchResult.location.x
      });
    }
  }

  const submitForm: SubmitHandler<IFormData> = async formData => {
    try {
      const formatMemberList: IMember[] = (memberList as IUser[]).map(member => {
        return {
          memberId: member._id
        };
      });
      formData.members = formatMemberList;
      formData.plans = planList;
      formData.imageUrl = mainImageUrl || '';
      onSubmit?.(formData);
    } catch (error) {
      // console.log('🚀 ~ error:::', error);
    }
  };

  return (
    <div className={cn('form-login', className)} data-testid="form-login" {...rest}>
      <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit(submitForm)} method="post">
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-3">
            <div className="space-y-2">
              <Label text="Tiêu đề" color="dark" className="font-semibold" />
              <Input
                className={`text-gray-text-gray-400 w-full rounded-lg border-none bg-gray-100 px-2 py-3 text-xs md:text-sm`}
                placeholder={'Nhập tiêu đề lịch trình...'}
                {...register('topic')}
              />
              {errors.topic && <span className="text-rose-500">{errors.topic?.message?.toString()}</span>}
            </div>
            <div className="flex grow flex-col space-y-2">
              <Label text="Tải ảnh lên" color="dark" className="font-semibold" />
              <UploadImageSection imageUrl={mainImageUrl} className="grow" handleUpFile={handleUpFile} />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <Label text="Bắt đầu - Kết thúc" color="dark" className="font-semibold" />
              <DateRangePicker
                date={{from: form.getValues('startDate'), to: form.getValues('endDate')}}
                onChange={handleDateRangeChange}
              />
              <Input className={`hidden`} type="date" {...register('startDate')} />
              <Input className={`hidden`} type="date" {...register('endDate')} />
              {errors.startDate && <span className="text-rose-500">{errors.startDate?.message?.toString()}</span>}
              {errors.endDate && <span className="text-rose-500">{errors.endDate.message?.toString()}</span>}
            </div>
            <div className="flex h-max flex-col gap-2">
              <Label text="Mô tả" color="dark" className="font-semibold" />
              <Textarea className="grow rounded-lg pl-4 pt-3" rows={5} {...register('description')} />
              {errors.description && <span className="text-rose-500">{errors.description?.message?.toString()}</span>}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-3">
              <div className="space-y-2">
                <Label text="Tổng Chi phí" color="dark" className="font-semibold" />
                <Input
                  className={`text-gray-text-gray-400 w-full rounded-lg border-none bg-gray-100 px-2 py-3 text-xs md:text-sm`}
                  placeholder={'Nhập tổng chi phí...'}
                  type="number"
                  {...register('total', {
                    setValueAs: v => (v === '' ? undefined : parseInt(v, 10))
                  })}
                />
                {errors && errors.total && <span className="text-rose-500">{errors.total.message}</span>}
              </div>
            </div>
            <div className="flex h-full w-full flex-col gap-2">
              <Label text="Mời bạn bè" color="dark" className="font-semibold" />
              <FriendsSuggestion
                onClick={handleClickFriendAvatar}
                friends={friendList}
                defaultSelectedList={memberList}
              />
            </div>
          </div>

          {planList.map((plan, index) => (
            <div className="space-y-3" key={index}>
              <p className="font-bold text-gray-950">Lịch trình - {index + 1}</p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <Label text="Tên lịch trình" color="dark" className="font-semibold" />
                  <Input
                    className={`text-gray-text-gray-400 w-full rounded-lg border-none bg-gray-100 px-2 py-3 text-xs md:text-sm`}
                    placeholder={'Nhập tên lịch trình...'}
                    {...register(`plans.${index}.title`)}
                    onChange={e => handleChangePlanName(index, e.target.value)}
                  />
                  {errors && errors.plans && errors.plans[index] && errors.plans[index].title && (
                    <span className="text-rose-500">{errors.plans[index].title.message}</span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <Label text="Chi phí" color="dark" className="font-semibold" />
                  <Input
                    className={`text-gray-text-gray-400 w-full rounded-lg border-none bg-gray-100 px-2 py-3 text-xs md:text-sm`}
                    placeholder={'Nhập chi phí...'}
                    type="number"
                    min={0}
                    {...register(`plans.${index}.cost`, {
                      setValueAs: v => (v === '' ? undefined : parseInt(v, 10))
                    })}
                    onChange={e => handleChangePlanCost(index, Number(e.target.value))}
                  />
                  {errors && errors.plans && errors.plans[index] && errors.plans[index].cost && (
                    <span className="text-rose-500">{errors.plans[index].cost.message}</span>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label text="Thời gian" color="dark" className="font-semibold" />
                <DateTimePicker
                  className={cn('w-full')}
                  fromDate={dateRange?.from ? dateRange?.from : new Date()}
                  toDate={dateRange?.to ? dateRange?.to : new Date()}
                  defaultDate={plan.startAt ? new Date(plan.startAt) : undefined}
                  onChange={date => {
                    handleChangePlanStartAt(index, date);
                  }}
                />
                <Input className={`hidden`} {...register(`plans.${index}.startAt`)} />
                {errors && errors.plans && errors.plans[index] && errors.plans[index].startAt && (
                  <span className="text-rose-500">{errors.plans[index].startAt.message}</span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label text="Điểm đến" color="dark" className="font-semibold" />
                <Input
                  className={`text-gray-text-gray-400 w-full rounded-lg border-none bg-gray-100 px-2 py-3 text-xs md:text-sm`}
                  placeholder={'Nhập điểm đến...'}
                  value={plan.address ?? ''}
                  {...register(`plans.${index}.address`)}
                  onChange={e => handleChangePlanAddress(index, e.target.value)}
                />
                {errors && errors.plans && errors.plans[index] && errors.plans[index].address && (
                  <span className="text-rose-500">{errors.plans[index].address.message}</span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <Label text="Tìm kiếm địa điểm" color="dark" className="font-semibold" />
                  <Map
                    className="h-[211px] w-full rounded-lg"
                    defaultLocation={{...plan.location, address: plan.address}}
                    onSearch={e => handleSearchAddress(index, e)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label text="Tải ảnh lên" color="dark" className="font-semibold" />
                  <UploadImageSection
                    className="grow"
                    handleUpFile={(file: File) => handleChangePlanImage(index, file)}
                    imageUrl={plan.imageUrl}
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            className="flex w-fit items-center gap-1 rounded-lg bg-orange-500 p-2 font-bold text-[#FCFCFC]"
            type="button"
            onClick={handleAddPlan}
          >
            <Icon name="ico-plus" />
            Thêm lịch trình
          </button>
          <button type="submit" className="w-full rounded-lg bg-orange-500 p-2 font-bold text-[#FCFCFC]">
            Tiếp tục
          </button>
        </div>
      </form>
    </div>
  );
};

FormTrip.displayName = 'FormTrip';

export default FormTrip;
