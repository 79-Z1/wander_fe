import {ISchedule} from './schedule.entity';

export interface IUser {
  _id?: string;
  socketId?: string;
  name?: string;
  avatar?: string;
  password?: string;
  email?: string;
  address?: string;
  phoneNumber?: string;
  dateOfBirth?: Date;
  gender?: string;
  providerAccountId?: string;
  provider?: string;
  authType?: string;
  isActive?: boolean;
  isOnline?: boolean;
  role?: UserRole;
}

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin'
}

export type TFriendStatus = 'none' | 'friend' | 'request-received' | 'request-sent' | 'self';

export interface IUserProfile {
  status: TFriendStatus;
  user: IUser;
  schedules?: ISchedule[];
}
