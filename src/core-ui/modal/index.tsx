'use client';

import React, {FC, ReactNode, useMemo} from 'react';
import classNames from 'classnames';
import {AnimatePresence, motion} from 'framer-motion';

import Backdrop from '../backdrop';
import Close from '../close';
import Portal from '../portal';
import {ICoreUIBaseProps, ModalVariantType} from '../types';

import Body, {IModalBodyProps} from './body';
import Content from './content';
import Footer, {IModalFooterProps} from './footer';
import Header, {IModalHeaderProps} from './header';
import {getVariantClass} from './utils';

interface IModalComposition {
  Header: FC<IModalHeaderProps>;
  Body: FC<IModalBodyProps>;
  Footer: FC<IModalFooterProps>;
}

export interface IModalProps extends ICoreUIBaseProps {
  children?: ReactNode;
  variant?: ModalVariantType;
  contentClassName?: string;
  backdropClassName?: string;
  fullScreen?: boolean;
  backdrop?: boolean;
  showCloseButton?: boolean;
  closeOnBackdrop?: boolean;
  closeByEscapeKey?: boolean;
  transitionTime?: number;
  closeClassName?: string;
  open: boolean;
  onClose: () => void;
}

const Modal: FC<IModalProps> & IModalComposition = ({
  children,
  contentClassName = '',
  className = 'max-w-xl',
  variant = 'top',
  backdropClassName = '',
  backdrop = true,
  showCloseButton = true,
  closeOnBackdrop = true,
  transitionTime = 250,
  open = false,
  closeClassName,
  onClose
}) => {
  const dialogVariantClass = useMemo(() => getVariantClass(variant), []);

  const handleClose = () => {
    onClose();
  };

  return (
    <Portal>
      <AnimatePresence>
        <Backdrop
          className={classNames('abc-modal scrollbar', backdropClassName, dialogVariantClass, backdrop ? '' : 'p-0')}
          visible={open}
          onClick={() => {
            if (closeOnBackdrop) handleClose();
          }}
        >
          {open && (
            <motion.div
              initial={{opacity: 0, scale: 0.8}}
              animate={{opacity: 1, scale: 1}}
              exit={{opacity: 0, scale: 0.8}}
              transition={{duration: transitionTime / 1000}}
              className={classNames('abc-modal__dialog', className)}
              onClick={e => {
                e.stopPropagation();
              }}
            >
              <Content className={classNames(contentClassName)}>
                {children}
                <Close
                  className={classNames('abc-modal__close', closeClassName)}
                  visible={showCloseButton}
                  onClick={handleClose}
                />
              </Content>
            </motion.div>
          )}
        </Backdrop>
      </AnimatePresence>
    </Portal>
  );
};

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

Modal.displayName = 'ABCModal';

export default Modal;
