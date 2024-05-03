import React, {FC} from 'react';
import Image from 'next/image';
import {ISchedule} from '@/common/entities';
import {IUser} from '@/common/entities/user.entity';

import {Button} from '@/core-ui';

import {cn} from '@/components/utils';

import {IComponentBaseProps} from '@/common/interfaces';

import avatarImage from '@/assets/images/avatar.png';
import tripBGImage from '@/assets/images/trip-bg.jpg';

import TripCardInfo from './trip-card-info';

export type TTripCardProps = IComponentBaseProps & {
  schedule: ISchedule;
  onClick?: () => void;
};

const TripCard: FC<TTripCardProps> = ({className, schedule, onClick}) => {
  return (
    <div
      className={cn('trip-card', 'gap-2 rounded-lg bg-zinc-50 p-3', className)}
      data-testid="TripCard"
      onClick={onClick}
    >
      <div className="relative aspect-[2/1] w-full rounded-lg pb-[50%]">
        <Image
          alt={schedule?.topic || 'Trip'}
          src={schedule?.imageUrl || tripBGImage}
          fill
          className="absolute rounded-lg object-cover object-center"
        />
      </div>
      <TripCardInfo schedule={schedule} />
      <div className="flex items-center justify-between">
        <div className="flex">
          {(schedule?.members as IUser[])?.map((member, index) => (
            <Image
              key={index}
              src={member?.avatar || avatarImage}
              alt="Avatar"
              className="-mr-4 rounded-full border-[1px] border-gray-300"
              width={40}
              height={40}
            />
          ))}
        </div>
        <Button variant="contained" className="rounded-lg" text="See more" />
      </div>
    </div>
  );
};

TripCard.displayName = 'TripCard';

export default TripCard;
