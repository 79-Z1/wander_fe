import React, {FC} from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

import {Icon} from '@/core-ui';

import {cn} from '@/components/utils';

import {IComponentBaseProps} from '@/common/interfaces';

import avatarImage from '@/assets/images/avatar.png';
import tripImage from '@/assets/images/trip.jpg';

const Map = dynamic(() => import('@/common/components/map/map'), {
  ssr: false
});

export type THomeTripProps = IComponentBaseProps;

const HomeTrip: FC<THomeTripProps> = ({className}) => {
  return (
    <div
      className={cn('home-trip flex h-full w-full flex-col justify-between gap-3 rounded-lg p-6', className)}
      style={{background: `url(${tripImage.src}) no-repeat center center`, backgroundSize: 'cover'}}
      data-testid="HomeTrip"
    >
      <div className="flex items-center justify-end gap-1">
        <div className="flex w-fit gap-1 rounded-[33px] bg-zinc-50 p-1">
          <div className="flex">
            <Image
              src={avatarImage.src}
              alt="Avatar"
              className="-mr-4 rounded-full border-[1px] border-gray-300"
              width={44}
              height={44}
            />
            <Image
              src={avatarImage.src}
              alt="Avatar"
              className="-mr-4 rounded-full border-[1px] border-gray-300"
              width={44}
              height={44}
            />
            <Image
              src={avatarImage.src}
              alt="Avatar"
              className="-mr-4 rounded-full border-[1px] border-gray-300"
              width={44}
              height={44}
            />
          </div>
          <span className="ml-4 flex items-center justify-center rounded-lg p-[8px_8px_8px_1px]">+2</span>
        </div>
        <div className="flex items-center justify-center rounded-full bg-white p-3">
          <Icon name="ico-bell-on" />
        </div>
      </div>
      <Map className="h-[135px] w-[236px] rounded-lg" />
    </div>
  );
};

HomeTrip.displayName = 'HomeTrip';

export default HomeTrip;
