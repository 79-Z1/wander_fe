import React, {FC} from 'react';

import {cn} from '@/components/utils';

import Home from '@/common/components/home/home';

import {IComponentBaseProps} from '@/common/interfaces';

export type TPageHomeProps = IComponentBaseProps;

const PageHome: FC<TPageHomeProps> = ({className}) => {
  return (
    <div className={cn('page-home h-full w-full', className)} data-testid="PageHome">
      <Home />
    </div>
  );
};

PageHome.displayName = 'PageHome';

export default PageHome;
