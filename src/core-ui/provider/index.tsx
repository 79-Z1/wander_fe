'use client';

import React, {FC, ReactNode} from 'react';

import ModalProvider from '../modal/state/provider';
import {ICoreUIBaseProps} from '../types';

interface ICoreUIProviderProps extends ICoreUIBaseProps {
  children: ReactNode;
}

const CoreUIProvider: FC<ICoreUIProviderProps> = ({children}) => {
  return <ModalProvider>{children}</ModalProvider>;
};

CoreUIProvider.displayName = 'CoreUIProvider';

export default CoreUIProvider;
