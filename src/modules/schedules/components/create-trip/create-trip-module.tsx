'use client';
import React, {FC, useMemo} from 'react';
import {useRouter} from 'next/navigation';
import dayjs from 'dayjs';

import {useToast} from '@/components/ui/use-toast';
import {cn} from '@/components/utils';

import useGlobalState from '@/common/hooks/use-global-state';
import useScheduleState from '@/common/hooks/use-schedule-state';

import {IComponentBaseProps} from '@/common/interfaces';

import FormTrip, {IFormData} from '../form-trip';

export type TCreateTripModuleProps = IComponentBaseProps;

const formatEndDate = dayjs().startOf('day').add(1).toDate();
const initialDefaultValues: IFormData = {
  topic: '',
  total: 0,
  startDate: new Date(Date.now()),
  endDate: formatEndDate,
  description: '',
  imageUrl: '',
  members: [],
  plans: []
};

const CreateTripModule: FC<TCreateTripModuleProps> = ({className}) => {
  const router = useRouter();
  const {toast} = useToast();
  const scheduleState = useScheduleState();
  const {setLoading} = useGlobalState();

  const defaultValues = useMemo(
    () => ({
      ...initialDefaultValues,
      startDate: new Date(new Date().setHours(0, 0, 0, 0)),
      endDate: dayjs().startOf('day').add(1, 'day').toDate()
    }),
    []
  );

  function submitCreate(formData: IFormData) {
    scheduleState.create?.(formData);
    toast({
      variant: 'success',
      description: 'Tạo lịch trình thành công!!!',
      duration: 3000
    });
    setLoading(true);
    router.push('/trip');
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }

  return (
    <div
      className={cn('create-trip-module h-full w-full rounded-lg bg-zinc-50 p-6', className)}
      data-testid="CreateTripModule"
    >
      <h1 className="px-4 pb-3 text-center text-2xl font-bold">Tạo lịch trình mới</h1>
      <FormTrip defaultValues={defaultValues} onSubmit={submitCreate} />
    </div>
  );
};

CreateTripModule.displayName = 'CreateTripModule';

export default CreateTripModule;
