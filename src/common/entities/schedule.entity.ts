import {ENUM_MEMBER_PERMISSION, ENUM_SCHEDULE_STATUS} from '../constants';

export interface ILocation {
  lat: number;
  lng: number;
}

export interface IPlan {
  title: string;
  cost: number;
  startAt: Date;
  endAt: Date;
  address: string;
  location: ILocation;
}

export interface IMember {
  memberId: string;
  permission: ENUM_MEMBER_PERMISSION;
}

export interface ICreateSchedule {
  topic: string;
  description: string;
  imageUrl: string;
  members: IMember[];
  startDate?: Date;
  endDate?: Date;
}

export interface ISchedule {
  id: string;
  topic: string;
  description: string;
  plans: IPlan[];
  members: IMember[];
  total: number;
  startDate: Date;
  endDate: Date;
  status: ENUM_SCHEDULE_STATUS;
}
