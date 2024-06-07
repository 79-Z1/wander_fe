import {IUser} from '../entities/user.entity';

export type TSendMessage = {text?: string; conversationId?: string; isActive?: boolean; messageAt?: Date};
export type TJoinConversation = {conversationId: string};
export type TUpdateMessages = {messages: IMessage[]};

export interface IMessage {
  _id?: string;
  sender: IUser;
  text: string;
  pinned?: boolean;
  reactions?: IReaction[];
  isActive?: boolean;
  messageAt?: Date;
  seen?: boolean;
}

export interface IReaction {
  reacter: string;
  emotion: 'like' | 'love' | 'sad' | 'angry' | 'happy';
}

export interface IParticipant {
  userId: string;
  status: 'blocked' | 'normal';
}

export interface IConversation {
  _id: string;
  type: 'private' | 'group' | 'ai';
  creatorId: string;
  imageUrl?: string;
  name: string;
  participants: IParticipant[];
  isActive: boolean;
  messages: IMessage[];
  isOnline: boolean;
}
