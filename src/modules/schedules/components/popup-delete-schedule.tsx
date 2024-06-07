import React, {FC} from 'react';

import {Modal} from '@/core-ui';

import {Button} from '@/components/ui/button';

import {IComponentBaseProps} from '@/common/interfaces';

type IPopupDeleteScheduleProps = IComponentBaseProps & {
  onClose?: () => void;
  onCick?: (isYes: boolean) => void;
};

const PopupDeleteSchedule: FC<IPopupDeleteScheduleProps> = ({onClose, onCick, visible = false}) => {
  const [, setIsYes] = React.useState(false);
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
            <p className="text-center text-2xl">Bạn có chắc chắn muốn xóa lịch trình này không?</p>
          </div>
          <div className="flex justify-center gap-3">
            <Button
              className="w-1/3 bg-red-500 hover:bg-red-600"
              onClick={() => {
                setIsYes(true);
                onCick?.(true);
                onClose?.();
              }}
            >
              Có
            </Button>
            <Button
              className="w-1/3 bg-gray-500 hover:bg-gray-600"
              onClick={() => {
                setIsYes(false);
                onCick?.(false);
                onClose?.();
              }}
            >
              Hủy
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PopupDeleteSchedule;
