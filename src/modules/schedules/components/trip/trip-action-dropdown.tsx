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

export type TTripActionDopdownProps = IComponentBaseProps & {
  scheduleId: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onCreateChatGroup?: (name: string) => void;
};

const TripActionDopdown: FC<TTripActionDopdownProps> = ({className, onEdit, onDelete, onCreateChatGroup}) => {
  const [showPopupCreate, setShowPopupCreate] = useState(false);
  return (
    <div className={cn('TripActionDopdown', className)} data-testid="TripActionDopdown">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem className="cursor-pointer">Xem chi tiết</DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={onEdit}>
            Chỉnh sửa
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={() => setShowPopupCreate(true)}>
            Tạo nhóm chat
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">Xóa</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <PopupCreateGroupChat
        visible={showPopupCreate}
        onClose={() => setShowPopupCreate(false)}
        onCreate={onCreateChatGroup}
      />
    </div>
  );
};

TripActionDopdown.displayName = 'TripActionDopdown';

export default TripActionDopdown;
