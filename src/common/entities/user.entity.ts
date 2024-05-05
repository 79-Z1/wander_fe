export interface IUser {
  _id?: string;
  socketId?: string;
  name: string;
  avatar: string;
  password?: string;
  email: string;
  address: string;
  phoneNumber: string;
  dateOfBirth?: Date;
  gender: string;
  providerAccountId?: string;
  provider?: string;
  authType?: string;
  isActive?: boolean;
  role?: UserRole;
}

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin'
}

export type TFriendStatus = 'none' | 'friend' | 'request-received' | 'request-sent';

export interface IUserProfile {
  status: TFriendStatus;
  user: IUser;
}
