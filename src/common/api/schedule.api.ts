import * as HttpRequest from '@/common/http/http-request';

import {ICreateSchedule, ISchedule} from '../entities';
import FetchRequest from '../http/fetch-request';

const create = async (data: ICreateSchedule) => {
  return await HttpRequest.post<ISchedule>('schedule', data);
};

const getAll = async () => {
  return await HttpRequest.get<ISchedule[]>('schedule');
};

const readScheduleBySlugSeverSide = async (slug: string) => {
  try {
    const res = await FetchRequest(`schedule/${slug}`, {cache: 'no-cache', next: {revalidate: undefined}});
    const json = await res.json();

    return json.metadata as ISchedule;
  } catch (error) {
    return null;
  }
};

const readUserCalendarsSeverSide = async () => {
  try {
    const res = await FetchRequest(`schedule/calendar`, {cache: 'no-cache', next: {revalidate: undefined}});
    const json = await res.json();

    return json.metadata as ISchedule;
  } catch (error) {
    return null;
  }
};

export const ScheduleApi = {
  create,
  getAll,
  readScheduleBySlugSeverSide,
  readUserCalendarsSeverSide
};

export default ScheduleApi;
