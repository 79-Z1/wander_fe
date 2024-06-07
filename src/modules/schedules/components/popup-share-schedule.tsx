import React, {FC} from 'react';
import {useQRCode} from 'next-qrcode';

import {Modal} from '@/core-ui';

import InputCopy from '@/common/components/input-copy';

import {IComponentBaseProps} from '@/common/interfaces';

type IPopupShareScheduleProps = IComponentBaseProps & {
  onClose?: () => void;
  scheduleId?: string;
};

const PopupShareSchedule: FC<IPopupShareScheduleProps> = ({onClose, scheduleId, visible = false}) => {
  const {Image: QRImage} = useQRCode();

  return (
    <Modal
      open={visible}
      variant="center"
      showCloseButton={true}
      onClose={() => {
        onClose?.();
      }}
      contentClassName="bg-gray-200"
      className="w-[345px] md:w-[500px] xl:w-[678px]"
    >
      <Modal.Header></Modal.Header>
      <Modal.Body className="relative p-3 pb-9">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-3">
            <span className="text-sm font-bold md:text-base">Chia sẻ lịch trình</span>
            <InputCopy
              className="w-full text-secondary"
              name={`${process.env.NEXT_PUBLIC_SITE_URL}/trip/${scheduleId}`}
            />
          </div>
          <div className="flex flex-col items-center gap-4">
            <span className="text-sm font-semibold md:text-base">QR code lịch trình</span>
            <div className="overflow-hidden rounded-lg">
              <QRImage
                text={`${process.env.NEXT_PUBLIC_SITE_URL}/trip/${scheduleId}`}
                options={{
                  errorCorrectionLevel: 'M',
                  margin: 3,
                  scale: 4,
                  width: 343,
                  color: {dark: '#000000ff', light: '#ffffffff'}
                }}
              />
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PopupShareSchedule;
