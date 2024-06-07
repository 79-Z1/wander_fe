import React, {FC, useState} from 'react';
import {DotsHorizontalIcon} from '@radix-ui/react-icons';

import {Button} from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {cn} from '@/components/utils';

import {IComponentBaseProps} from '@/common/interfaces';

import PopupCreateGroupChat from './popup-create-group-chat';
import PopupDeleteSchedule from './popup-delete-schedule';
import PopupShareSchedule from './popup-share-schedule';

export type TTripActionDopdownProps = IComponentBaseProps & {
  isOwner?: boolean;
  scheduleId?: string;
  isEditable?: boolean;
  canCreateGroupChat?: boolean;
  onEdit?: () => void;
  onDelete?: (isYes: boolean) => void;
  onCreateChatGroup?: (name: string) => void;
  onWatchDetail?: () => void;
};

const TripActionDopdown: FC<TTripActionDopdownProps> = ({
  className,
  isOwner,
  scheduleId,
  isEditable,
  canCreateGroupChat,
  onEdit,
  onDelete,
  onCreateChatGroup,
  onWatchDetail
}) => {
  const [showPopupCreate, setShowPopupCreate] = useState(false);
  const [showPopupDelete, setShowPopupDelete] = useState(false);
  const [showPopupShare, setShowPopupShare] = useState(false);
  return (
    <div className={cn('TripActionDopdown', className)} data-testid="TripActionDopdown">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem className="cursor-pointer" onClick={onWatchDetail}>
            Xem chi tiết
          </DropdownMenuItem>
          {isEditable && (
            <DropdownMenuItem className="cursor-pointer" onClick={onEdit}>
              Chỉnh sửa
            </DropdownMenuItem>
          )}
          <DropdownMenuItem className="cursor-pointer" onClick={() => setShowPopupShare(true)}>
            Chia sẻ
          </DropdownMenuItem>
          {isOwner && (
            <>
              {canCreateGroupChat && (
                <DropdownMenuItem className="cursor-pointer" onClick={() => setShowPopupCreate(true)}>
                  Tạo nhóm chat
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setShowPopupDelete(true)}
                className="cursor-pointer text-red-500 hover:text-red-600"
              >
                Xóa
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <PopupCreateGroupChat
        visible={showPopupCreate}
        onClose={() => setShowPopupCreate(false)}
        onCreate={onCreateChatGroup}
      />
      <PopupShareSchedule visible={showPopupShare} scheduleId={scheduleId} onClose={() => setShowPopupShare(false)} />
      <PopupDeleteSchedule visible={showPopupDelete} onCick={onDelete} onClose={() => setShowPopupDelete(false)} />
    </div>
  );
};

TripActionDopdown.displayName = 'TripActionDopdown';

export default TripActionDopdown;
