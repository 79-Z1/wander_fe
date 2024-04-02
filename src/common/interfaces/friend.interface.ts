import {IUserAttribute} from '../entities';

export interface IUserFriend {
  _id: string;
  friendId: string;
  friends: IFriend[];
  friendsRequestSent: IFriendSent[];
  friendsRequestReceved: IFriendRecieved[];
}

export interface IUpdateFriend {
  type: string;
  friend: IFriend;
}

export interface IFriend {
  user: IUserAttribute;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IFriendRecieved {
  user: IUserAttribute;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IFriendSent {
  user: IUserAttribute;
  createdAt?: Date;
  updatedAt?: Date;
}
