import React, {FC, ReactNode, useEffect} from 'react';
import classNames from 'classnames';

import {useTab} from './state';

export interface ITabListProps {
  className?: string;
  children: ReactNode;
  active: string;
  onChange?: (activeTab: string) => void;
}

export const List: FC<ITabListProps> = ({className, children, active = '', onChange}) => {
  const tab = useTab();

  useEffect(() => {
    tab.setActiveTab(active);
  }, []);

  useEffect(() => {
    onChange?.(tab.activeTab);
  }, [tab.activeTab]);

  return <div className={classNames('abc-tab_list', className)}>{children}</div>;
};

export default List;
