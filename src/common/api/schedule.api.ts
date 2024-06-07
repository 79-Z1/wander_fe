import * as HttpRequest from '@/common/http/http-request';

import {ENUM_MEMBER_PERMISSION, ENUM_SCHEDULE_TAB} from '../constants';
import {IFormDataSchedule, ISchedule} from '../entities';
import FetchRequest from '../http/fetch-request';
import {generateQueryParams} from '../utils/generate-query-params.util';

const create = async (data: IFormDataSchedule) => {
  return await HttpRequest.post<ISchedule>('schedule', data);
};

const update = async (data: IFormDataSchedule) => {
  return await HttpRequest.patch<ISchedule>('schedule', data);
};

const getAll = async (tab: ENUM_SCHEDULE_TAB) => {
  const queryParams = generateQueryParams({tab});
  return await HttpRequest.get<ISchedule[]>(`schedule?${queryParams}`);
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

const readUserCalendars = async () => {
  return await HttpRequest.get<any[]>(`schedule/calendar`);
};

const deleteSchedule = async (scheduleId: string) => {
  return await HttpRequest.post<boolean>(`schedule/delete`, {
    scheduleId
  });
};

const editMemberPermission = async (scheduleId: string, memberId: string, permission: ENUM_MEMBER_PERMISSION) => {
  return await HttpRequest.patch<boolean>(`schedule/edit-permission`, {
    scheduleId,
    memberId,
    permission
  });
};

export const ScheduleApi = {
  create,
  update,
  getAll,
  getEditTrip,
  readScheduleBySlugSeverSide,
  readUserCalendarsSeverSide,
  deleteSchedule,
  editMemberPermission,
  readUserCalendars
};

export default ScheduleApi;
