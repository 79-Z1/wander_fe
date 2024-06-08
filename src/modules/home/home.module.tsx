'use client';
import React, {FC, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {signOut, useSession} from 'next-auth/react';

import ExploreModule from '@/modules/explore/explore.module';

import {useToast} from '@/components/ui/use-toast';

import {IComponentBaseProps} from '@/common/interfaces';

type HomeModuleProps = IComponentBaseProps;

const HomeModule: FC<HomeModuleProps> = () => {
  const router = useRouter();
  const session = useSession();
  const {toast} = useToast();

  useEffect(() => {
    if (session.data?.user.isActive === false) {
      toast({
        variant: 'destructive',
        title: 'Tài khoản của bạn đã bị khoá',
        description: 'Vui lòng liên hệ quản trị viên để được hỗ trợ',
        duration: 5000
      });
      const timeout = setTimeout(() => signOut({callbackUrl: '/login'}), 5000);
      return () => clearTimeout(timeout);
    }
    if (session.status === 'authenticated') router.push('/calendar');
  }, [session.status]);

  if (session.status === 'loading') return null;

  if (session.status !== 'authenticated') return <ExploreModule className="-m-6" />;
};

export default HomeModule;
