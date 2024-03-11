import React, {forwardRef, ReactNode, useMemo} from 'react';
import classNames from 'classnames';

import {ICoreUIBaseProps} from '../types';
import {getChildrenAddAssignProps} from '../utils/get-children-and-assign-props';

export interface IAccordionItemProps extends ICoreUIBaseProps {
  children?: ReactNode;
  label: string;
}

const AccordionItem = forwardRef<HTMLDivElement, IAccordionItemProps>(({className, children, label}, ref) => {
  const childrenItem = useMemo(() => getChildrenAddAssignProps(children, {label}), []);

  return (
    <div
      ref={ref}
      className={classNames(
        'overflow-hidden border first-of-type:rounded-tl first-of-type:rounded-tr last-of-type:rounded-bl last-of-type:rounded-br [&:not(:first-of-type)]:border-t-0',
        className
      )}
    >
      {childrenItem}
    </div>
  );
});

AccordionItem.displayName = 'Accordion.Item';

export default AccordionItem;
