export interface IClassifiedUserConversation {
  privateConversations: IPrivateConversation[];
  groupConversations: IGroupConversation[];
}

export interface IPrivateConversation {
  _id: string;
  name?: string;
  image?: string;
}

export interface IGroupConversation {
  _id: string;
  name?: string;
  image?: string;
}
