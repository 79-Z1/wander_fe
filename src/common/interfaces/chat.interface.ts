export type TSendMessage = {text?: string; conversationId?: string; isActive?: boolean; messageAt?: Date};
export type TJoinConversation = {conversationId: string};
export type TUpdateMessages = {messages: IMessage[]};

export interface IMessage {
  sender: string;
  text: string;
  pinned: boolean;
  reactions: IReaction[];
  isActive: boolean;
  messageAt: Date;
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
  creatorId: string;
  name: string;
  participants: IParticipant[];
  isActive: boolean;
  messages: IMessage[];
}
