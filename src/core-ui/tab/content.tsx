import React, {FC, ReactNode} from 'react';
import classNames from 'classnames';

import {useTab} from './state';

export interface ITabContentProps {
  className?: string;
  children: ReactNode;
  label: string;
}

export const Content: FC<ITabContentProps> = ({className, children, label}) => {
  const tab = useTab();

  return tab.activeTab === label ? <div className={classNames('tab-content', className)}>{children}</div> : null;
};

export default Content;
