import {forwardRef, ReactNode} from 'react';
import classNames from 'classnames';

import Collapse from '../collapse';
import {ICoreUIBaseProps} from '../types';

import {useAccordionState} from './state';

export interface IAccordionBodyProps extends ICoreUIBaseProps {
  children?: ReactNode;
  label?: string;
}

const AccordionBody = forwardRef<HTMLDivElement, IAccordionBodyProps>(({className, children, label}, ref) => {
  const state = useAccordionState();

  return (
    <div ref={ref} className={classNames(className)}>
      <Collapse open={state.active[label || '']}>
        <div className="p-3">{children}</div>
      </Collapse>
    </div>
  );
});

AccordionBody.displayName = 'Accordion.Body';

export default AccordionBody;
