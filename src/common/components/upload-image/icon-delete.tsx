import React, {FC} from 'react';
import classNames from 'classnames';

import {Icon} from '@/core-ui';

import {IComponentBaseProps} from '@/common/interfaces';

type IconDeleteProps = IComponentBaseProps & {
  disabled?: boolean;
  onClick?: () => void;
};

const IconDelete: FC<IconDeleteProps> = ({className, disabled, onClick}) => {
  return (
    <Icon
      name="ico-trash"
      className={classNames(
        'icon-delete',
        disabled ? 'tooltip-trash !cursor-not-allowed' : '',
        'text-red-500',
        className
      )}
      size={16}
      onClick={() => !disabled && onClick?.()}
    />
  );
};

IconDelete.displayName = 'IconDelete';

export default IconDelete;
