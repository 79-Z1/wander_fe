import FetchRequest from '@/common/http/fetch-request';

import {IClassifiedUserConversation} from '../entities/chat.entity';
import HttpRequest from '../http/http-request';
import {IConversation} from '../interfaces';

const readConversationBySlugSeverSide = async (slug: string) => {
  try {
    const res = await FetchRequest(`chat/${slug}`, {cache: 'no-cache', next: {revalidate: undefined}});
    const json = await res.json();

    return json.metadata as IConversation;
  } catch (error) {
    return null;
  }
};

const getUserConservations = async () => {
  return HttpRequest.get<IClassifiedUserConversation>(`chat/user-conversations`);
};

export const ChatApi = {
  readConversationBySlugSeverSide,
  getUserConservations
};

export default ChatApi;
