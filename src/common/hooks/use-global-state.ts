import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer';

interface IState {
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
        });
      },
      setOnline: isOnline => {
        set(state => {
          state.isOnline = isOnline;
        });
      }
    }))
  )
);

export default useGlobalState;
