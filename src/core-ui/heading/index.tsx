'use client';

import React, {FC, HTMLAttributes, memo, ReactNode} from 'react';
import classNames from 'classnames';

import {HeadingType, ICoreUIBaseProps} from '../types';

interface IHeadingProps extends ICoreUIBaseProps, HTMLAttributes<HTMLHeadingElement> {
  children?: ReactNode;
  text?: string;
  as?: HeadingType;
}

const Heading: FC<IHeadingProps> = ({className, visible = true, text, children, as = 'h1', ...rest}) => {
  if (!visible) return null;

  const Element = as;
  const content = text || children;
  return (
    <Element {...rest} className={classNames('abc-heading', className)}>
      {content}
    </Element>
  );
};

Heading.displayName = 'ABCHeading';

export default memo(Heading);
