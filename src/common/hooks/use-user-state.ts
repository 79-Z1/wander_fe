import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer';

import {IInitState} from '@/common/interfaces';

import UserApi from '../api/user.api';
import {IUser} from '../entities/user.entity';

interface IState extends IInitState {
  users: IUser[];
}

interface IActions {
  searchByName: (name: string) => void;
  setUsers: (users: IUser[]) => void;
}

const useUserState = create<IState & IActions>()(
  devtools(
    immer(set => ({
      isFetching: false,
      users: [],
      searchByName: async name => {
        try {
          set(state => {
            state.isFetching = true;
          }, false);
          const res = await UserApi.searchByNameNoAuth(name);
          set(state => {
            state.users = res.metadata;
            state.statusCode = res.statusCode;
            state.error = res.error;
            state.message = res.message;
            state.isFetching = false;
          }, false);
        } catch (error) {
          set({isFetching: false}, false);
        }
      },
      setUsers: users => {
        set(state => {
          state.users = users;
        }, false);
      }
    }))
  )
);

export default useUserState;
