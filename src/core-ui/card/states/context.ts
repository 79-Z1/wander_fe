'use client';

import {createContext} from 'react';

export interface IState {
  color: string;
}

export const initialState: IState = {
  color: ''
};

export const Context = createContext<IState>(initialState);
