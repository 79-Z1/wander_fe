export interface IUser {
  _id: string;
  socketId: string;
  name: string;
  avatar: string;
  password: string;
  email: string;
  address: string;
  phoneNumber: string;
  providerAccountId: string;
  provider: string;
  authType: string;
  isActive: boolean;
}
