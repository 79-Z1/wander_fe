import React, {FC} from 'react';

import {cn} from '@/components/utils';

import {IComponentBaseProps} from '@/common/interfaces';

import HomeTrip from './trip';

export type THomeProps = IComponentBaseProps;

const Home: FC<THomeProps> = ({className}) => {
  return (
    <div
      className={cn('home flex h-full w-full gap-6 self-stretch rounded-lg bg-gray-100', className)}
      data-testid="Home"
    >
      <div className="flex grow basis-1/2 flex-col gap-6 p-3">
        <HomeTrip className="basis-1/2" />
        <HomeTrip className="basis-1/2" />
      </div>
      <div className="flex basis-1/2 flex-col gap-6 p-3"></div>
    </div>
  );
};

Home.displayName = 'Home';

export default Home;
