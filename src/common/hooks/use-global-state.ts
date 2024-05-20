import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer';

import {IInitState} from '@/common/interfaces';

interface IState extends IInitState {
  isLoading: boolean;
  isOnline: boolean;
}

interface IActions {
  setLoading: (isLoading: boolean) => void;
  setOnline: (isOnline: boolean) => void;
}

const useGlobalState = create<IState & IActions>()(
  devtools(
    immer(set => ({
      isLoading: false,
      isOnline: true,
      setLoading: isLoading => {
        set(state => {
          state.isLoading = isLoading;
        }, false);
      },
      setOnline: isOnline => {
        set(state => {
          state.isOnline = isOnline;
        }, false);
      }
    }))
  )
);

export default useGlobalState;
