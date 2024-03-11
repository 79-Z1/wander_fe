import React, {FC, ReactNode} from 'react';
import classNames from 'classnames';

import {ICoreUIBaseProps} from '../types';

interface IBoxProps extends ICoreUIBaseProps {
  children?: ReactNode;
}

const Box: FC<IBoxProps> = ({className, children}) => {
  return <div className={classNames('abc-box', className)}>{children}</div>;
};

Box.displayName = 'ABCBox';

export default Box;
