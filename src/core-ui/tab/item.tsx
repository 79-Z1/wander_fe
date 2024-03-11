import React, {FC, ReactNode} from 'react';
import classNames from 'classnames';

import {useTab} from './state';

export interface ITabItemProps {
  className?: string;
  activeClassName?: string;
  children: ReactNode;
  label: string;
  disabled?: boolean;
}

export const Item: FC<ITabItemProps> = ({className, disabled, label, children, activeClassName}) => {
  const {activeTab, setActiveTab} = useTab();

  return (
    <button
      className={classNames(
        'abc-tab__item',
        activeTab === label && classNames('abc-tab__item--active', activeClassName),
        disabled && 'abc-tab__item--disabled',
        className
      )}
      disabled={disabled}
      onClick={() => setActiveTab(label)}
    >
      {children}
    </button>
  );
};

export default Item;
