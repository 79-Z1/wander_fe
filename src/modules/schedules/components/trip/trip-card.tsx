import React, {FC} from 'react';
import Image from 'next/image';
import {ISchedule} from '@/common/entities';

import {Button} from '@/core-ui';

import {cn} from '@/components/utils';

import {IComponentBaseProps} from '@/common/interfaces';

import avatarImage from '@/assets/images/avatar.png';
import tripBGImage from '@/assets/images/trip-bg.jpg';

import TripCardInfo from './trip-card-info';

export type TTripCardProps = IComponentBaseProps & {
  schedule: ISchedule;
};

const TripCard: FC<TTripCardProps> = ({className, schedule}) => {
  return (
    <div className={cn('trip-card', 'gap-2 rounded-lg bg-zinc-50 p-3', className)} data-testid="TripCard">
      <div className="relative aspect-[2/1] w-full rounded-lg pb-[50%]">
        <Image alt="" src={tripBGImage} fill className="absolute rounded-lg object-cover object-center" />
      </div>
      <TripCardInfo schedule={schedule} />
      <div className="flex items-center justify-between">
        <div className="flex">
          <Image
            src={avatarImage}
            alt="Avatar"
            className="-mr-4 rounded-full border-[1px] border-gray-300"
            width={40}
            height={40}
          />
          <Image
            src={avatarImage}
            alt="Avatar"
            className="-mr-4 rounded-full border-[1px] border-gray-300"
            width={40}
            height={40}
          />
          <Image
            src={avatarImage}
            alt="Avatar"
            className="-mr-4 rounded-full border-[1px] border-gray-300"
            width={40}
            height={40}
          />
        </div>
        <Button variant="contained" className="rounded-lg" text="See more" />
      </div>
    </div>
  );
};

TripCard.displayName = 'TripCard';

export default TripCard;
