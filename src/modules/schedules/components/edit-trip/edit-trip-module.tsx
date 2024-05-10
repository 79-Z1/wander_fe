'use client';
import React, {FC, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import ScheduleApi from '@/common/api/schedule.api';

import {Loading} from '@/core-ui';

import NotFoundModule from '@/modules/not-found/not-found';

import {useToast} from '@/components/ui/use-toast';
import {cn} from '@/components/utils';

import useGlobalState from '@/common/hooks/use-global-state';
import useScheduleState from '@/common/hooks/use-schedule-state';

import {IComponentBaseProps} from '@/common/interfaces';

import FormTrip, {IFormData} from '../form-trip';

export type TEditTripModuleProps = IComponentBaseProps & {
  slug?: string;
};

const EditTripModule: FC<TEditTripModuleProps> = ({className, slug}) => {
  const router = useRouter();
  const {toast} = useToast();
  const scheduleState = useScheduleState();
  const {setLoading} = useGlobalState();

  const [defaultValues, setDefaultValues] = React.useState<IFormData & {_id: string}>();

  useEffect(() => {
    const getEditTrip = async () => {
      try {
        const response = await ScheduleApi.getEditTrip(slug || '');
        if (!response?.metadata) return <NotFoundModule />;

        const tripData = {
          ...response.metadata,
          startDate: new Date(response.metadata?.startDate || new Date()),
          endDate: new Date(response.metadata?.endDate || new Date())
        };
        setDefaultValues(tripData);
      } catch (error) {
        error;
      }
    };
    getEditTrip();
  }, [slug]);

  function submitEdit(formData: IFormData) {
    formData._id = defaultValues?._id;
    scheduleState.update?.(formData);
    toast({
      variant: 'success',
      description: 'Chỉnh sửa lịch trình thành công!!!',
      duration: 3000
    });
    setLoading(true);
    router.push('/trip');
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }

  if (!defaultValues) {
    return <Loading className="grid w-full place-items-center" />;
  }

  return (
    <div
      className={cn('create-trip-module h-full w-full rounded-lg bg-zinc-50 p-6', className)}
      data-testid="EditTripModule"
    >
      <h1 className="px-4 pb-3 text-center text-2xl font-bold">Chỉnh sửa hành trình</h1>
      <FormTrip defaultValues={defaultValues} onSubmit={submitEdit} />
    </div>
  );
};

EditTripModule.displayName = 'EditTripModule';

export default EditTripModule;
