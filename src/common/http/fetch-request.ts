import {getServerSession} from 'next-auth';

import {authOptions} from '../configs/auth.config';

const fetchBaseURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export const FetchRequest = async (url: string, init?: RequestInit | undefined) => {
  const headers: Record<string, string> = {'Content-Type': 'application/json'};

  const session = await getServerSession(authOptions);
  const accessToken = session?.user.accessToken;
  const userId = session?.user.id || '';

  if (accessToken) {
    headers.authorization = accessToken;
    headers['x-client-id'] = userId;
  }

  return fetch(`${fetchBaseURL}/${url}`, {headers, next: {revalidate: 60}, ...init});
};

export default FetchRequest;
