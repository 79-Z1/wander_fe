'use client';
import React, {FC, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {useSession} from 'next-auth/react';

import ExploreModule from '@/modules/explore/explore.module';

import {IComponentBaseProps} from '@/common/interfaces';

type HomeModuleProps = IComponentBaseProps;

const HomeModule: FC<HomeModuleProps> = () => {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session.status === 'authenticated') router.push('/calendar');
  }, [session.status]);

  if (session.status === 'loading') return null;

  if (session.status !== 'authenticated') return <ExploreModule className="-m-6" />;
};

export default HomeModule;
