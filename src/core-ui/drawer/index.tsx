'use client';

import React, {FC, memo, ReactNode} from 'react';
import classNames from 'classnames';

import Backdrop from '../backdrop';
import Icon from '../icon';
import Portal from '../portal';

interface IProps {
  className?: string;
  contentClassName?: string;
  titleClassName?: string;
  title?: string;
  children?: ReactNode;
  open: boolean;
  nameIconTitle?: string;
  iconCloseVisible?: boolean;
  anchor?: 'top' | 'right' | 'bottom' | 'left';
  backdrop?: boolean;
  onClose?: (value: boolean) => void;
}

const Drawer: FC<IProps> = ({
  className,
  backdrop = false,
  open = false,
  anchor = 'left',
  title = '',
  iconCloseVisible = false,
  children,
  nameIconTitle = '',
  contentClassName,
  titleClassName,
  onClose
}) => {
  return (
    <Portal>
      <div className={classNames('drawer-container', anchor, open && 'show', className)}>
        <Backdrop visible={backdrop && open} onClick={() => onClose?.(backdrop ? true : false)} />
        <div className={classNames('drawer-content', contentClassName)}>
          <div className="drawer-header">
            <div className={classNames('drawer-title', titleClassName)}>
              {nameIconTitle && <Icon name={nameIconTitle} size={24} />}
              <h5 className="mx-1 text-sm">{title}</h5>
            </div>
            {iconCloseVisible && (
              <button onClick={() => onClose?.(false)}>
                <Icon name="ico-times" />
              </button>
            )}
          </div>
          <div className="drawer-body">{children}</div>
        </div>
      </div>
    </Portal>
  );
};

Drawer.displayName = 'ABCDrawer';

export default memo(Drawer);
