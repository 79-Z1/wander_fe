'use client';
import React, {FC} from 'react';
import Image from 'next/image';
import {useRouter} from 'next/navigation';

import {Button} from '@/components/ui/button';
import {cn} from '@/components/utils';

import {IComponentBaseProps} from '@/common/interfaces';

import logo from '@/assets/images/logo.png';

type TTopbarUnauthProps = IComponentBaseProps;

const TopbarUnauth: FC<TTopbarUnauthProps> = ({className}) => {
  const router = useRouter();

  return (
    <div
      className={cn('TopbarUnauth flex w-full items-center justify-between gap-4 bg-gray-100 px-[80px]', className)}
      data-testid="TopbarUnauth"
    >
      <div className="flex items-center gap-4" onClick={() => router.push('/')}>
        <Image src={logo} alt="Wander" width={48} height={48} />
        <p className="text-xl font-bold text-[#EF7A6F]">Wander</p>
      </div>
      <div className="space-x-2">
        <Button className="hover:bg-orange-600" onClick={() => router.push('/login')}>
          Đăng nhập
        </Button>
        <Button className="hover:bg-orange-600" onClick={() => router.push('/register')}>
          Đăng kí
        </Button>
      </div>
    </div>
  );
};

TopbarUnauth.displayName = 'TopbarUnauth';

export default TopbarUnauth;
