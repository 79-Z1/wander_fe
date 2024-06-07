import React, {FC, useState} from 'react';
import {DotsVerticalIcon} from '@radix-ui/react-icons';

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

import {ENUM_MEMBER_PERMISSION} from '@/common/constants';

import {IComponentBaseProps} from '@/common/interfaces';

export type TMemberActionDopdownProps = IComponentBaseProps & {
  permission?: ENUM_MEMBER_PERMISSION;
  onEdit?: () => void;
  onDelete?: (isYes: boolean) => void;
};

const MemberActionDopdown: FC<TMemberActionDopdownProps> = ({className, permission, onEdit, onDelete}) => {
  const [showPopupDelete, setShowPopupDelete] = useState(false);
  return (
    <div className={cn('MemberActionDopdown', className)} data-testid="MemberActionDopdown">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
            <DotsVerticalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <>
            <DropdownMenuItem className="cursor-pointer" onClick={onEdit}>
              {permission === ENUM_MEMBER_PERMISSION.EDIT ? 'Chuyển sang chỉ xem' : 'Cho phép chỉnh sửa'}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setShowPopupDelete(true)}
              className="cursor-pointer text-red-500 hover:text-red-600"
            >
              Xóa thành viên
            </DropdownMenuItem>
          </>
        </DropdownMenuContent>
      </DropdownMenu>
      <PopupDelete
        visible={showPopupDelete}
        text="Bạn có chắc chắn muốn xóa người này ra khỏi lịch trình không"
        onCick={onDelete}
        onClose={() => setShowPopupDelete(false)}
      />
    </div>
  );
};

MemberActionDopdown.displayName = 'MemberActionDopdown';

export default MemberActionDopdown;
