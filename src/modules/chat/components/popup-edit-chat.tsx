import React, {FC} from 'react';
import {IConversationDisplay} from '@/common/entities';

import {Label, Modal} from '@/core-ui';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';

import {IComponentBaseProps} from '@/common/interfaces';

type IPopupEditChatProps = IComponentBaseProps & {
  contact?: IConversationDisplay;
  onClose?: () => void;
  onSubmit?: (name: string) => void;
};

const PopupEditChat: FC<IPopupEditChatProps> = ({onClose, onSubmit, contact, visible = false}) => {
  const [name, setName] = React.useState(contact?.name || '');
  const [submit, setSubmit] = React.useState(false);

  return (
    <Modal
      open={visible}
      variant="center"
      showCloseButton={true}
      onClose={() => {
        setName(contact?.name || '');
        onClose?.();
      }}
      contentClassName="bg-zinc-50"
      className="w-[345px] md:w-[500px] xl:w-[678px]"
    >
      <Modal.Header></Modal.Header>
      <Modal.Body className="relative p-3 pb-9">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <Label text="Tên cuộc hội thoại" color="dark" className="font-semibold" />
            <Input
              className={`w-full rounded-lg border border-default-border p-3 text-xs text-black md:text-sm`}
              placeholder={'Nhập tên cuộc hội thoại...'}
              value={name}
              onChange={e => setName(e.target.value)}
            />
            {submit && !name.trim() && <p className="text-red-500">Vui lòng nhập tên cuộc hội thoại</p>}
          </div>

          <div className="flex justify-center">
            <Button
              className="w-1/2 hover:bg-orange-600"
              onClick={() => {
                onSubmit?.(name.trim());
                if (name.trim()) return onClose?.();
                setSubmit(true);
                setName(contact?.name || '');
              }}
            >
              Hoàn tất
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PopupEditChat;
