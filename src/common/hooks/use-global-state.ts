import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer';

import {IInitState} from '@/common/interfaces';

interface IState extends IInitState {
  isLoading: boolean;
}

interface IActions {
  setLoading: (isLoading: boolean) => void;
}

const useGlobalState = create<IState & IActions>()(
  devtools(
    immer(set => ({
      isLoading: false,
      setLoading: isLoading => {
        set(state => {
          state.isLoading = isLoading;
        }, false);
      }
    }))
  )
);

export default useGlobalState;
