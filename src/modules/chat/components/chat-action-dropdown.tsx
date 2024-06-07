import React, {FC, useState} from 'react';
import {IConversationDisplay} from '@/common/entities';
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

import PopupDelete from '@/common/components/popup/popup-delete';

import {IComponentBaseProps} from '@/common/interfaces';

import PopupEditChat from './popup-edit-chat';

export type TChatActionDopdownProps = IComponentBaseProps & {
  contact?: IConversationDisplay;
  isOwner?: boolean;
  scheduleId?: string;
  isEditable?: boolean;
  onEdit?: (name: string) => void;
  onDelete?: (isYes: boolean) => void;
};

const ChatActionDopdown: FC<TChatActionDopdownProps> = ({contact, className, onDelete, onEdit}) => {
  const [showPopupDelete, setShowPopupDelete] = useState(false);
  const [showPopupEdit, setShowPopupEdit] = useState(false);
  return (
    <div className={cn('ChatActionDopdown', className)} data-testid="ChatActionDopdown">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex h-5 w-7 p-0 data-[state=open]:bg-muted">
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem className="cursor-pointer" onClick={() => setShowPopupEdit(true)}>
            Chỉnh sửa tên
          </DropdownMenuItem>
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setShowPopupDelete(true)}
              className="cursor-pointer text-red-500 hover:text-red-600"
            >
              Xóa
            </DropdownMenuItem>
          </>
        </DropdownMenuContent>
      </DropdownMenu>
      <PopupDelete
        text="Bạn có chắc chắn muốn xóa cuộc trò chuyện này không?"
        visible={showPopupDelete}
        onCick={onDelete}
        onClose={() => setShowPopupDelete(false)}
      />
      <PopupEditChat
        visible={showPopupEdit}
        contact={contact}
        onClose={() => setShowPopupEdit(false)}
        onSubmit={onEdit}
      />
    </div>
  );
};

ChatActionDopdown.displayName = 'ChatActionDopdown';

export default ChatActionDopdown;
