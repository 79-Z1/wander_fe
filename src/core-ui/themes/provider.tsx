'use client';

import React, {FC, ReactNode} from 'react';

import ModalProvider from '../modal/state/provider';

import {Context} from './context';
import {IThemeState} from './state';
import {defaultTheme} from '.';

interface ICoreUIProviderProps {
  theme: IThemeState;
  children?: ReactNode;
}

const CoreUIProvider: FC<ICoreUIProviderProps> = ({theme = defaultTheme, children}) => {
  return (
    <Context.Provider value={theme}>
      <ModalProvider>{children}</ModalProvider>
    </Context.Provider>
  );
};

export default CoreUIProvider;
