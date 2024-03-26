import * as HttpRequest from '@/common/http/http-request';

import {ICreateSchedule, ISchedule} from '../entities';

const create = async (data: ICreateSchedule) => {
  return await HttpRequest.post<ISchedule>('schedule', data);
};

const getAll = async () => {
  return await HttpRequest.get<ISchedule[]>('schedule');
};

export const ScheduleApi = {
  create,
  getAll
};

export default ScheduleApi;
