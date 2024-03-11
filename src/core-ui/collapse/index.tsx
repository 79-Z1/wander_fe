'use client';

import React, {ReactNode} from 'react';
import classNames from 'classnames';
import {AnimatePresence, motion} from 'framer-motion';

import {ICoreUIBaseProps} from '../types';

interface ICollapseProps extends ICoreUIBaseProps {
  children?: ReactNode;
  open: boolean;
  duration?: number;
}

const Collapse: React.FC<ICollapseProps> = ({className, children, visible = true, duration = 250, open = false}) => {
  if (!visible) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={classNames('abc-collapse overflow-hidden', className)}
          initial={{height: 0}}
          animate={{height: 'auto'}}
          exit={{height: 0}}
          transition={{duration: duration / 1000}}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

Collapse.displayName = 'ABCCollapse';

export default Collapse;
