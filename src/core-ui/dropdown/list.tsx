import React, {FC, ReactNode} from 'react';
import classNames from 'classnames';

export interface IDropdownListProps {
  className?: string;
  children: ReactNode;
}

const List: FC<IDropdownListProps> = ({className, children}) => {
  return <div className={classNames('abc-dropdown__list', className)}>{children}</div>;
};

List.displayName = 'Dropdown.List';

export default List;
