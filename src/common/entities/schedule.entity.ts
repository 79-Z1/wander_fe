import {ENUM_MEMBER_PERMISSION, ENUM_PLAN_STATUS, ENUM_SCHEDULE_STATUS} from '../constants';

import {IUser} from './user.entity';

export interface ILocation {
  lat: number;
  lng: number;
}

export interface IPlan {
  title: string;
  cost: number;
  imageUrl?: string;
  startAt: Date | string;
  endAt: Date;
  address: string;
  location: ILocation;
  status?: ENUM_PLAN_STATUS;
}

export interface ILocationSearch {
  address?: string;
  lat?: number;
  lng?: number;
}

export interface IMember {
  memberId: string;
  permission?: ENUM_MEMBER_PERMISSION;
}

export interface IFormDataSchedule {
  topic: string;
  description: string;
  imageUrl: string;
  members: IMember[] | IUser[];
  startDate?: Date;
  endDate?: Date;
}

export interface ISchedule {
  _id: string;
  topic: string;
  imageUrl: string;
  description: string;
  plans: IPlan[];
  members: IMember[] | IUser[];
  total: number;
  startDate: Date;
  endDate: Date;
  status: ENUM_SCHEDULE_STATUS;
  progress?: number;
  isOwner?: boolean;
  canCreateGroupChat?: boolean;
  permission?: ENUM_MEMBER_PERMISSION;
}

export interface IScheduleDetail {
  _id: string;
  topic: string;
  imageUrl: string;
  description: string;
  plans: IPlan[];
  members: (IUser & {
    permission?: ENUM_MEMBER_PERMISSION;
  })[];
  total: number;
  startDate: Date;
  endDate: Date;
  status: ENUM_SCHEDULE_STATUS;
  progress?: {
    percent?: number;
    part?: string;
  };
  isOwner?: boolean;
  ownerId: string;
  permission?: ENUM_MEMBER_PERMISSION;
  canCreateGroupChat?: boolean;
}
