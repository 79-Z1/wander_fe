import React, {FC} from 'react';
import Image from 'next/image';

import {cn} from '@/components/utils';

import {IComponentBaseProps} from '@/common/interfaces';

import ScheduleEmptyImage from '@/assets/images/friend-empty.png';

export type TScheduleEmptyProps = IComponentBaseProps & {
  text?: string;
};

const ScheduleEmpty: FC<TScheduleEmptyProps> = ({className, text}) => {
  return (
    <div
      className={cn('voucher-list-empty', 'flex h-full w-full flex-col items-center justify-center', className)}
      data-testid="ScheduleEmpty"
    >
      <Image src={ScheduleEmptyImage} alt={'friend empty'} />
      <p>{text}</p>
    </div>
  );
};

ScheduleEmpty.displayName = 'ScheduleEmpty';

export default ScheduleEmpty;
