import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer';

interface State {
  pages: string[];
}

type Actions = {
  addPage: (page: string) => void;
  getPage: () => string;
};

const useBackNavigationHistory = create<State & Actions>()(
  devtools(
    immer((set, get) => ({
      pages: [],
      addPage(page) {
        set(
          state => {
            state.pages = [...get().pages, page];
          },
          false,
          'backNavigationHistory/addPage'
        );
      },
      getPage() {
        const previousPage = get().pages.slice(-1)[0];
        set(state => {
          state.pages = get().pages.slice(0, -1);
        });
        return previousPage;
      }
    })),
    {
      name: 'backNavigationHistory',
      enabled: process.env.NODE_ENV === 'development'
    }
  )
);

export default useBackNavigationHistory;
