import React, {FC} from 'react';
import {IScheduleDetail} from '@/common/entities';

import {cn} from '@/components/utils';

import {IComponentBaseProps} from '@/common/interfaces';

export type TOwnerCardInfoProps = IComponentBaseProps & {
  schedule: IScheduleDetail;
};

const OwnerCardInfo: FC<TOwnerCardInfoProps> = ({className, schedule}) => {
  return (
    <div className={cn('OwnerCardInfo rounded-lg bg-zinc-50 p-3 shadow', className)} data-testid="OwnerCardInfo">
      <p className="mb-3 text-[18px] font-bold">Thông tin người tạo</p>
      <ul className="list-inside list-disc space-y-2">
        <li>
          <span className="text-gray-500">Họ và tên: </span>
          <span className="text-gray-400">{schedule?.members[0]?.name}</span>
        </li>
        <li>
          <span className="text-gray-500">Email: </span>
          <span className="text-gray-400">{schedule?.members[0]?.email}</span>
        </li>
        <li>
          <span className="text-gray-500">Số điện thoại: </span>
          <span className="text-gray-400">{schedule?.members[0]?.phoneNumber}</span>
        </li>
        <li>
          <span className="text-gray-500">Địa chỉ: </span>
          <span className="text-gray-400">{schedule?.members[0]?.address}</span>
        </li>
      </ul>
    </div>
  );
};

OwnerCardInfo.displayName = 'OwnerCardInfo';

export default OwnerCardInfo;
