import React, {FC} from 'react';
import classNames from 'classnames';

import {Button, Icon} from '@/core-ui';

import {IComponentBaseProps} from '@/common/interfaces';

interface ICreateTripProps extends IComponentBaseProps {
  isExpand?: boolean;
  onClick?: () => void;
}

const CreateTrip: FC<ICreateTripProps> = ({className, isExpand = true, onClick}) => {
  return (
    <Button
      className={classNames(
        'create-trip-button py flex w-full gap-x-1 whitespace-nowrap rounded-lg p-2 text-xs font-bold md:text-base',
        {
          'border border-orange-500': isExpand
        },
        className
      )}
      onClick={onClick}
    >
      <Icon name="ico-plus-circle text-orange-500" />
      {isExpand && <span className="inline-block text-orange-500">Tạo chuyến đi</span>}
    </Button>
  );
};

CreateTrip.displayName = 'CreateTrip';

export default CreateTrip;
