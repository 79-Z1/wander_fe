import React, {forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes} from 'react';
import classNames from 'classnames';

import {getBorderColor} from '../themes/utils/get-theme-colors';
import {ColorType, ICoreUIBaseProps} from '../types';

import {Context, initialState} from './states/context';
import CardBody, {ICardBodyProps} from './body';
import CardHeader, {ICardHeaderProps} from './header';

interface ICardComposition {
  Header: ForwardRefExoticComponent<ICardHeaderProps & RefAttributes<HTMLDivElement>>;
  Body: ForwardRefExoticComponent<ICardBodyProps & RefAttributes<HTMLDivElement>>;
}

interface ICardProps extends ICoreUIBaseProps {
  children?: ReactNode;
  color?: ColorType;
}

const Card = forwardRef<HTMLDivElement, ICardProps>(({className, children, color = '', ...rest}, ref) => {
  const themeColor = getBorderColor(color as ColorType);

  return (
    <Context.Provider value={{...initialState, color}}>
      <div ref={ref} className={classNames('abc-card overflow-hidden rounded border', themeColor, className)} {...rest}>
        {children}
      </div>
    </Context.Provider>
  );
}) as ForwardRefExoticComponent<ICardProps & RefAttributes<HTMLDivElement>> & ICardComposition;

Card.Header = CardHeader;
Card.Body = CardBody;

Card.displayName = 'Card';

export default Card;
