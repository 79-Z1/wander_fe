import React, {FC, ReactNode} from 'react';
import classNames from 'classnames';

export interface IDropdownTriggerProps {
  className?: string;
  children: ReactNode;
}

const Trigger: FC<IDropdownTriggerProps> = ({className, children}) => {
  return <div className={classNames('abc-dropdown__trigger', className)}>{children}</div>;
};

Trigger.displayName = 'Dropdown.Trigger';

export default Trigger;
