import React, {FC, ReactNode} from 'react';
import classNames from 'classnames';

export interface IModalBodyProps {
  className?: string;
  children: ReactNode;
}

const Body: FC<IModalBodyProps> = ({className, children}) => {
  return <div className={classNames('abc-modal__body', className)}>{children}</div>;
};

Body.displayName = 'Modal.Body';

export default Body;
