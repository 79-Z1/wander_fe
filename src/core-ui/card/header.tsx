import {forwardRef, ReactNode} from 'react';
import classNames from 'classnames';

import {getBackgroudColor} from '../themes/utils/get-theme-colors';
import {ColorType, ICoreUIBaseProps} from '../types';

import {useCardState} from './states/use-card';

export interface ICardHeaderProps extends ICoreUIBaseProps {
  children?: ReactNode;
}

const CardHeader = forwardRef<HTMLDivElement, ICardHeaderProps>(({className, children}, ref) => {
  const state = useCardState();
  const themeColor = getBackgroudColor(state.color as ColorType);

  return (
    <div ref={ref} className={classNames('abc-card__header', themeColor, className)}>
      {children}
    </div>
  );
});

CardHeader.displayName = 'Card.Header';

export default CardHeader;
