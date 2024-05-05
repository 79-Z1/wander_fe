import * as HttpRequest from '@/common/http/http-request';

import {IUser} from '../entities/user.entity';
import {IStaticThisMonth, IStatistic} from '../interfaces/admin.interface';

const getUsers = async () => {
  return await HttpRequest.get<IUser[]>('admin/user');
};

const updateUser = async (data: IUser) => {
  return await HttpRequest.patch<IUser>('/admin/user', data);
};

const getStatistic = async () => {
  return await HttpRequest.get<IStatistic[]>('/admin/statistic');
};

const getUserStatistic = async () => {
  return await HttpRequest.get<IStaticThisMonth>('/admin/statistic/user');
};

const getScheduleStatistic = async () => {
  return await HttpRequest.get<IStaticThisMonth>('/admin/statistic/schedule');
};

export const AdminApi = {
  getUsers,
  updateUser,
  getStatistic,
  getUserStatistic,
  getScheduleStatistic
};

export default AdminApi;
