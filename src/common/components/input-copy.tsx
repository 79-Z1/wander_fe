import React, {FC} from 'react';
import classNames from 'classnames';
import {Copy} from 'lucide-react';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {useToast} from '@/components/ui/use-toast';

import {IComponentBaseProps} from '@/common/interfaces';

interface IInputCopyProps extends IComponentBaseProps {
  name: string;
  backgroundColor?: string;
}

const InputCopy: FC<IInputCopyProps> = ({className, name, backgroundColor = 'bg-white', ...rest}) => {
  const {toast} = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(name);

    toast({
      variant: 'success',
      title: 'Đã sao chép liên kết' + '!',
      description: 'Sao chép liên kết thành công',
      duration: 3000
    });
  };

  return (
    <div data-testid="input-copy" className={classNames(className)} {...rest}>
      <div className="relative flex space-x-2">
        <Input className={`pr-10 text-center ${backgroundColor} text-black`} value={name} readOnly />
        <Button type="button" className="absolute right-0 bg-transparent px-3 text-black" onClick={handleCopy}>
          <Copy />
        </Button>
      </div>
    </div>
  );
};

InputCopy.displayName = 'InputCopy';

export default InputCopy;
