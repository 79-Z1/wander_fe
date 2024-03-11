import React, {FC} from 'react';

import {Icon} from '@/core-ui';

import {cn} from '@/components/utils';

import {IComponentBaseProps} from '@/common/interfaces';

export type TPageHomeProps = IComponentBaseProps;

const PageHome: FC<TPageHomeProps> = ({className}) => {
  return (
    <div className={cn('compname', className)} data-testid="PageHome">
      <h1>PageHome</h1>
      <Icon name="ico-eye" className="text-red" size={64} />
    </div>
  );
};

PageHome.displayName = 'PageHome';

export default PageHome;
