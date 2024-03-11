import React, {FC} from 'react';
import classNames from 'classnames';

export interface IDropdownItemProps {
  className?: string;
  text: string;
}

const Item: FC<IDropdownItemProps> = ({className, text = ''}) => {
  return <button className={classNames('abc-dropdown__item', className)}>{text}</button>;
};

Item.displayName = 'Dropdown.Item';

export default Item;
