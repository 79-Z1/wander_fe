import React, {FC} from 'react';

import {Label, Modal} from '@/core-ui';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';

import {IComponentBaseProps} from '@/common/interfaces';

type IPopupCreateGroupChatProps = IComponentBaseProps & {
  onClose?: () => void;
  onCreate?: (name: string) => void;
};

const PopupCreateGroupChat: FC<IPopupCreateGroupChatProps> = ({onClose, onCreate, visible = false}) => {
  const [name, setName] = React.useState('');
  const [submit, setSubmit] = React.useState(false);

  return (
    <Modal
      open={visible}
      variant="center"
      showCloseButton={true}
      onClose={() => {
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
              className={`w-full rounded-lg border border-default-border p-3 text-xs text-gray-400 md:text-sm`}
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
                onCreate?.(name.trim());
                if (name.trim()) return onClose?.();
                setSubmit(true);
              }}
            >
              Tạo
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PopupCreateGroupChat;
