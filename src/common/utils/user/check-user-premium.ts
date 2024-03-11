import {Session} from 'next-auth';

import {ENUM_PLAN} from '@/common/constants';

export const checkUserPremium = (session: Session | null) => {
  const plan = session?.user?.plan || ENUM_PLAN.BASIC;

  return plan !== ENUM_PLAN.BASIC;
};
