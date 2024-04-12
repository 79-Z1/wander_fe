import React, {FC} from 'react';

import {cn} from '@/components/utils';

import {IComponentBaseProps} from '@/common/interfaces';

export type TEllipseProps = IComponentBaseProps;

const Ellipse: FC<TEllipseProps> = ({className}) => {
  return <span className={cn('Ellipse h-[9px] w-[9px] rounded-full', className)} data-testid="Ellipse"></span>;
};

Ellipse.displayName = 'Ellipse';

export default Ellipse;
