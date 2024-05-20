import FetchRequest from '@/common/http/fetch-request';

import {IClassifiedUserConversation} from '../entities/chat.entity';
import HttpRequest from '../http/http-request';
import {IConversation, IMessage} from '../interfaces';

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

const createGroupChat = async (name: string, scheduleId: string) => {
  return await HttpRequest.post<{name: string}>(`chat/group`, {name, scheduleId});
};

const askAI = async (conversationId: string, prompt: string) => {
  return await HttpRequest.post<IMessage[]>(`gemini`, {prompt, conversationId});
};

export const ChatApi = {
  readConversationBySlugSeverSide,
  getUserConservations,
  createGroupChat,
  askAI
};

export default ChatApi;
