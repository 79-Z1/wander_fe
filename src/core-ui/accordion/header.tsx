import {forwardRef, ReactNode} from 'react';
import classNames from 'classnames';

import Icon from '../icon';
import {ICoreUIBaseProps} from '../types';

import {useAccordionState} from './state';

export interface IAccordionHeaderProps extends ICoreUIBaseProps {
  children?: ReactNode;
  label?: string;
}

const AccordionHeader = forwardRef<HTMLButtonElement, IAccordionHeaderProps>(({className, children, label}, ref) => {
  const state = useAccordionState();

  return (
    <button
      ref={ref}
      className={classNames(
        'relative w-full bg-slate-100 text-left transition-all duration-150',
        state.active[label || ''] && 'bg-primary-200',
        className
      )}
      onClick={() => state.toggleActive(label || '')}
    >
      <Icon
        name="ico-angle-down"
        className={classNames('absolute right-3 top-1/2 -translate-y-1/2', state.active[label || ''] && 'rotate-180')}
      />
      {children}
    </button>
  );
});

AccordionHeader.displayName = 'Accordion.Header';

export default AccordionHeader;
