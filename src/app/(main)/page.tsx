import React, {FC} from 'react';
import {Metadata} from 'next';

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

export async function generateMetadata(): Promise<Metadata> {
  return {title: 'Home', description: 'Home Description'};
}

PageHome.displayName = 'PageHome';

export default PageHome;
