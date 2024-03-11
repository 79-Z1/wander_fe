'use client';

import {createContext, useContext} from 'react';

import initialState, {IThemeState} from './state';

export const Context = createContext<IThemeState>(initialState);

export const useTheme = () => useContext(Context);
