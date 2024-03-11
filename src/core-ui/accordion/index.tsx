'use client';

import React, {forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes, useEffect} from 'react';
import classNames from 'classnames';

import {ICoreUIBaseProps} from '../types';

import AccordionBody, {IAccordionBodyProps} from './body';
import AccordionHeader, {IAccordionHeaderProps} from './header';
import AccordionItem, {IAccordionItemProps} from './item';
import {useAccordionState} from './state';

interface IAccordionComposition {
  Item: ForwardRefExoticComponent<IAccordionItemProps & RefAttributes<HTMLDivElement>>;
  Header: ForwardRefExoticComponent<IAccordionHeaderProps & RefAttributes<HTMLButtonElement>>;
  Body: ForwardRefExoticComponent<IAccordionBodyProps & RefAttributes<HTMLDivElement>>;
}

interface IAccordionProps extends ICoreUIBaseProps {
  children?: ReactNode;
  active?: string;
}

const Accordion = forwardRef<HTMLDivElement, IAccordionProps>(({className, children, active = ''}, ref) => {
  const state = useAccordionState();

  useEffect(() => {
    state.setActive(active);
  }, []);

  return (
    <div ref={ref} className={classNames(className)}>
      {children}
    </div>
  );
}) as ForwardRefExoticComponent<IAccordionProps & RefAttributes<HTMLDivElement>> & IAccordionComposition;

Accordion.Item = AccordionItem;
Accordion.Header = AccordionHeader;
Accordion.Body = AccordionBody;

Accordion.displayName = 'Accordion';

export default Accordion;
