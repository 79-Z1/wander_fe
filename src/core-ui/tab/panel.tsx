import React, {FC, ReactNode} from 'react';
import classNames from 'classnames';

export interface ITabPanelProps {
  className?: string;
  children: ReactNode;
}

export const Panel: FC<ITabPanelProps> = ({className, children}) => {
  return <div className={classNames('abc-tab__panel', className)}>{children}</div>;
};

export default Panel;
