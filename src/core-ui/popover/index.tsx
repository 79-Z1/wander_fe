'use client';

import React, {FC, Fragment, ReactNode, useEffect, useRef} from 'react';
import classNames from 'classnames';
import {createPopper, Placement} from '@popperjs/core';

export interface IFilterItem {
  component: ReactNode;
}

interface IPopoverProps {
  children?: ReactNode;
  trigger?: ReactNode;
  items?: IFilterItem[];
  placement?: Placement;
  onHandleClick: (selectedOption: boolean) => void;
  isOpen?: boolean;
}

const Popover: FC<IPopoverProps> = ({children, trigger, isOpen, items, onHandleClick, placement = 'right-start'}) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const popperOptions = {
    placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [-1, 1]
        }
      },
      {
        name: 'preventOverflow',
        options: {boundary: 'viewport'}
      }
    ]
  };

  const createPopperInstance = () => {
    if (triggerRef.current && menuRef.current) {
      return createPopper(triggerRef.current, menuRef.current, popperOptions);
    }
    return null;
  };

  const destroyPopperInstance = (instance: any) => {
    if (instance) instance.destroy();
  };

  const popperInstanceRef = useRef<any>(null);

  useEffect(() => {
    destroyPopperInstance(popperInstanceRef.current);
    if (isOpen) {
      const instance = createPopperInstance();
      popperInstanceRef.current = instance;
    }
  }, [isOpen, placement]);

  useEffect(() => {
    if (isOpen) {
      const handleOutsideClick = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
          onHandleClick(false);
        }
      };

      document.addEventListener('mousedown', handleOutsideClick);

      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
      };
    }
  }, [isOpen]);

  if (!items) return null;

  return (
    <div className="abc-popover" ref={triggerRef}>
      <div className={classNames('abc-popover__trigger', isOpen && 'bg-primary-100')}>
        {typeof trigger === 'string' ? <button className="abc-popover__trigger-button">{trigger}</button> : trigger}
      </div>
      {isOpen && Boolean(items.length) && (
        <div
          className="abc-popover__content"
          ref={menuRef}
          onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            e.stopPropagation();
            const target = e.target as HTMLElement;
            if (target.className === 'rdp-button_reset rdp-button rdp-day') {
              onHandleClick(false);
            }
          }}
        >
          {items.map((item, i) => (
            <Fragment key={i}>{item.component}</Fragment>
          ))}
        </div>
      )}
      {children}
    </div>
  );
};

Popover.displayName = 'ABCPopover';

export default Popover;
