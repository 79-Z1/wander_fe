import {ENUM_MEMBER_PERMISSION, ENUM_SCHEDULE_STATUS} from '../constants';

import {IUser} from './user.entity';

export interface ILocation {
  lat: number;
  lng: number;
}

export interface IPlan {
  title: string;
  cost: number;
  imageUrl?: string;
  startAt: string;
  address: string;
  location: ILocation;
}

export interface ILocationSearch {
  address: string;
  lat: number;
  lng: number;
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
}
