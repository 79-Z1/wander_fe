import {Session} from 'next-auth';

export const checkUserVerified = (session: Session | null) => {
  const isVerified = session?.user?.isVerified || false;

  return isVerified;
};
