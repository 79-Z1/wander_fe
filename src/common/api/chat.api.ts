import FetchRequest from '@/common/http/fetch-request';

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

export const ChatApi = {
  readConversationBySlugSeverSide
};

export default ChatApi;
