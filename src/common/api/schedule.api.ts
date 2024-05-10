import * as HttpRequest from '@/common/http/http-request';

import {IFormDataSchedule, ISchedule} from '../entities';
import FetchRequest from '../http/fetch-request';

const create = async (data: IFormDataSchedule) => {
  return await HttpRequest.post<ISchedule>('schedule', data);
};

const update = async (data: IFormDataSchedule) => {
  return await HttpRequest.patch<ISchedule>('schedule', data);
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

const getEditTrip = async (slug: string) => {
  return HttpRequest.get<ISchedule>(`schedule/edit/${slug}`);
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
  update,
  getAll,
  getEditTrip,
  readScheduleBySlugSeverSide,
  readUserCalendarsSeverSide
};

export default ScheduleApi;
