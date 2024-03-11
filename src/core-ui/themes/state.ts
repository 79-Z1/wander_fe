import {ColorType} from '../types';

interface IRounded {
  button: boolean;
}

export interface IThemeState {
  color: ColorType;
  rounded: IRounded;
}

const initialState: IThemeState = {
  color: 'primary',
  rounded: {
    button: true
  }
};

export default initialState;
