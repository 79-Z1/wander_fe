'use client';
import React, {FC} from 'react';
import Image from 'next/image';

import {cn} from '@/components/utils';

import {IComponentBaseProps} from '@/common/interfaces';

import ExploreImage from '@/assets/images/explore.png';
import ExploreCoverImage from '@/assets/images/explore-cover.png';
import ExploreLaptopImage from '@/assets/images/explore-laptop.png';

export type TExploreModuleProps = IComponentBaseProps;

const ExploreModule: FC<TExploreModuleProps> = ({className}) => {
  return (
    <div className={cn('ExploreModule space-y-10', className)} data-testid="ExploreModule">
      <div className="relative">
        <div className="relative aspect-[2/1] h-[100vh] w-full">
          <Image src={ExploreImage} alt="explore" fill className="absolute rounded-lg object-cover object-center" />
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <p className="mb-10 text-center text-[60px] font-bold uppercase text-white">
            Hãy để những chuyến đi <br />
            <span className="text-orange-500">chữa lành</span>
            <br /> cho bạn
          </p>
          <p className="translate-y-0 cursor-pointer bg-transparent text-[40px] font-bold text-orange-500 hover:underline md:hover:-translate-y-3">
            Tham gia ngay
          </p>
        </div>
      </div>
      <div className="relative">
        <Image src={ExploreCoverImage} alt="explore" className="w-full" />
        <div className="absolute left-1/2 top-1/4 z-10 -translate-x-1/2 -translate-y-1/2 text-center">
          <Image src={ExploreLaptopImage} alt="explore" />
        </div>
      </div>
    </div>
  );
};

ExploreModule.displayName = 'ExploreModule';

export default ExploreModule;
