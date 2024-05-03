'use client';
import React, {FC, useEffect, useState} from 'react';
import Image from 'next/image';
import {useSession} from 'next-auth/react';
import UserApi from '@/common/api/user.api';
import {IUserProfile, TFriendStatus} from '@/common/entities/user.entity';
import {GlobalConnectSocket} from '@/common/sockets/global-connect.socket';

import {Button} from '@/components/ui/button';
import {cn} from '@/components/utils';

import useFriendState from '@/common/hooks/use-friend-state';

import {IComponentBaseProps} from '@/common/interfaces';

import profileBanner from '@/assets/images/profile-banner.png';

import NotFoundModule from '../not-found/not-found';

export type TProfileModuleProps = IComponentBaseProps & {
  slug?: string;
};

const ProfileModule: FC<TProfileModuleProps> = ({className, slug}) => {
  const session = useSession();
  const friendState = useFriendState();
  const [userProfile, setUserProfile] = useState<IUserProfile>();
  const [buttonText, setButtonText] = useState('');

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const response = await UserApi.getUserProfile(slug || '');
        setUserProfile(response.metadata);
        setButtonText(renderButtonText(response.metadata?.status || 'none'));
        if (!response?.metadata) return <NotFoundModule />;
      } catch (error) {
        error;
      }
    };
    getUserProfile();
  }, [slug, buttonText]);

  if (!session.data?.user && session.status === 'unauthenticated') return <NotFoundModule />;

  function renderButtonText(status: TFriendStatus) {
    switch (status) {
      case 'friend':
        return 'Bạn bè';
      case 'request-received':
        return 'Từ chối lời mời';
      case 'request-sent':
        return 'Hủy lời mời';
      default:
        return 'Gửi lời mời kết bạn';
    }
  }

  function handleButtonClick() {
    switch (userProfile?.status) {
      case 'friend':
        friendState.unFriend(userProfile?.user._id || '', GlobalConnectSocket);
        setButtonText('Gửi lời mời kết bạn');
        break;
      case 'request-received':
        friendState.rejectFriendRequest(userProfile?.user._id || '', GlobalConnectSocket);
        setButtonText('Gửi lời mời kết bạn');
        break;
      case 'request-sent':
        friendState.cancelFriendRequest(session.data?.user.id || '', userProfile?.user._id || '', GlobalConnectSocket);
        setButtonText('Gửi lời mời kết bạn');
        break;
      default:
        friendState.sendFriendRequest(session.data?.user.id || '', userProfile?.user._id || '', GlobalConnectSocket);
        setButtonText('Hủy lời mời');
    }
  }

  return (
    <div className={cn('ProfileModule', 'flex h-full flex-col gap-5 p-6', className)} data-testid="ProfileModule">
      <div className="relative w-full">
        <div
          className={`h-[244px] w-full rounded-lg bg-cover bg-center bg-no-repeat`}
          style={{backgroundImage: `url(${profileBanner.src})`}}
        ></div>
        <div className="absolute -bottom-[45px] flex w-full items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="relative h-[90px] w-[90px]">
              <Image
                fill
                src={userProfile?.user.avatar || ''}
                alt={userProfile?.user.name || ''}
                className="absolute rounded-lg object-cover object-center"
              />
            </div>
            <div className="space-y-2">
              <p className="font-bold">{userProfile?.user.name}</p>
              <p className="text-xs">{userProfile?.user.email}</p>
            </div>
          </div>
          <Button className="hover:bg-orange-600" onClick={handleButtonClick}>
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

ProfileModule.displayName = 'ProfileModule';

export default ProfileModule;
