import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer';

import {IInitState} from '@/common/interfaces';

import ScheduleApi from '../api/schedule.api';
import {ENUM_SCHEDULE_TAB} from '../constants';
import {IFormDataSchedule, ISchedule} from '../entities';

interface IState extends IInitState {
  schedules: ISchedule[];
}

interface IActions {
  create: (data: IFormDataSchedule) => void;
  update: (data: IFormDataSchedule) => void;
  getAll: (tab: ENUM_SCHEDULE_TAB) => void;
  deleteSchedule: (scheduleId: string) => void;
  setLoading: (status: boolean) => void;
}
//TODO remove
const useScheduleState = create<IState & IActions>()(
  devtools(
    immer((set, get) => ({
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
      update: async data => {
        try {
          const res = await ScheduleApi.update(data);
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
      getAll: async tab => {
        try {
          const res = await ScheduleApi.getAll(tab);
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
      },
      deleteSchedule: async scheduleId => {
        try {
          const res = await ScheduleApi.deleteSchedule(scheduleId);
          const newSchedules = get().schedules.filter(schedule => schedule._id !== scheduleId);
          set(state => {
            state.schedules = newSchedules;
            state.statusCode = res.statusCode;
            state.error = res.error;
            state.message = res.message;
            state.isFetching = false;
          }, false);
        } catch (error) {
          set({isFetching: false}, false);
        }
      },
      setLoading: (status: boolean) => {
        set({isFetching: status}, false);
      }
    }))
  )
);

export default useScheduleState;
