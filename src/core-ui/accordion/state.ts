import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';

interface IAccordionState {
  active: {[key: string]: boolean};
  setActive: (key: string) => void;
  toggleActive: (key: string) => void;
}

export const useAccordionState = create<IAccordionState>()(
  immer(set => ({
    active: {},
    setActive: key => {
      set(state => {
        state.active[key] = true;
      });
    },
    toggleActive: key => {
      set(state => {
        state.active[key] = !state.active[key];
      });
    }
  }))
);
