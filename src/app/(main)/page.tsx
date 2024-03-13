import React, {FC} from 'react';

import {cn} from '@/components/utils';

import {IComponentBaseProps} from '@/common/interfaces';

export type TPageHomeProps = IComponentBaseProps;

const PageHome: FC<TPageHomeProps> = ({className}) => {
  return <div className={cn('page-home', className)} data-testid="PageHome"></div>;
};

PageHome.displayName = 'PageHome';

export default PageHome;
