import React, {FC} from 'react';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {signOut} from 'next-auth/react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {cn} from '@/components/utils';

import {IMAGE_URL} from '@/common/constants';

import {IComponentBaseProps} from '@/common/interfaces';

export type TUserPopOverProps = IComponentBaseProps & {
  avatar?: string;
  id?: string;
};

const UserPopOver: FC<TUserPopOverProps> = ({className, avatar, id}) => {
  const router = useRouter();
  return (
    <div className={cn('UserPopOver', className)} data-testid="UserPopOver">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="relative h-[40px] w-[40px] cursor-pointer">
            <Image
              src={avatar || IMAGE_URL.USER}
              fill
              alt="avatar"
              className="absolute rounded-lg bg-black object-cover object-center"
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer" onClick={() => router.push(`/profile/${id}`)}>
              Trang cá nhân
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => signOut({redirect: true, callbackUrl: '/explore'})}
          >
            Đăng xuất
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

UserPopOver.displayName = 'UserPopOver';

export default UserPopOver;
