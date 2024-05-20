export interface IClassifiedUserConversation {
  privateConversations: IConversationDisplay[];
  groupConversations: IConversationDisplay[];
  aiConversations: IConversationDisplay[];
}

export interface IConversationDisplay {
  _id: string;
  name?: string;
  imageUrl?: string;
}
