import React, {FC, ReactNode, useEffect} from 'react';
import classNames from 'classnames';

import {ICoreUIBaseProps} from '../types';

import {useModal} from './state';
import {setRootClass} from './utils';

interface IModalContentProps extends ICoreUIBaseProps {
  children: ReactNode;
}

const Content: FC<IModalContentProps> = ({className, children}) => {
  const modal = useModal();

  useEffect(() => {
    modal.setCount(1);
    setRootClass(true);
    return () => {
      modal.setCount(-1);
      if (modal.count <= 0) setRootClass(false);
    };
  }, []);

  return <div className={classNames('abc-modal__content', className)}>{children}</div>;
};

Content.displayName = 'Modal.Content';

export default Content;
