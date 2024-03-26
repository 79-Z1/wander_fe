import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer';

import {IInitState} from '@/common/interfaces';

import ScheduleApi from '../api/schedule.api';
import {ICreateSchedule, ISchedule} from '../entities';

interface IState extends IInitState {
  schedules: ISchedule[];
}

interface IActions {
  create: (data: ICreateSchedule) => void;
  getAll: () => void;
}
//TODO remove
const useScheduleState = create<IState & IActions>()(
  devtools(
    immer(set => ({
      isFetching: true,
      schedules: [],
      create: async data => {
        try {
          const res = await ScheduleApi.create(data);
          set(state => {
            state.statusCode = res.statusCode;
            state.error = res.error;
            state.message = res.message;
            state.isFetching = false;
          }, false);
        } catch (error) {
          set({isFetching: false}, false);
        }
      },
      getAll: async () => {
        try {
          const res = await ScheduleApi.getAll();
          set(state => {
            state.schedules = res.metadata;
            state.statusCode = res.statusCode;
            state.error = res.error;
            state.message = res.message;
            state.isFetching = false;
          }, false);
        } catch (error) {
          set({isFetching: false}, false);
        }
      }
    }))
  )
);

export default useScheduleState;
