import {IUser} from './user.entity';

export interface INotification {
  _id?: string;
  user: IUser;
  emitter: IUser;
  content: string;
  url: string;
  seen: boolean;
  type: 'system' | 'client';
  createdAt?: Date;
  updatedAt?: Date;
}
