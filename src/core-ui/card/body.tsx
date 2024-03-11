import {forwardRef, ReactNode} from 'react';
import classNames from 'classnames';

import {ICoreUIBaseProps} from '../types';

export interface ICardBodyProps extends ICoreUIBaseProps {
  children?: ReactNode;
}

const CardBody = forwardRef<HTMLDivElement, ICardBodyProps>(({className, children}, ref) => {
  return (
    <div ref={ref} className={classNames('abc-card__body', className)}>
      {children}
    </div>
  );
});

CardBody.displayName = 'Card.Body';

export default CardBody;
