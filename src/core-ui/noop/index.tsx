'use client';

import {FC, ForwardedRef, forwardRef, ReactNode} from 'react';

interface INoopProps {
  className?: string;
  children?: ReactNode;
}

const Noop: FC<INoopProps> = forwardRef(({children}, ref: ForwardedRef<HTMLDivElement>) => (
  <div ref={ref}>{children}</div>
));

Noop.displayName = 'ABCNoop';

export default Noop;
