import React, {FC, useState} from 'react';
import classNames from 'classnames';

import {Button} from '@/components/ui/button';

import {ASPECT_RATIO_LIST} from '@/common/constants';

import {IComponentBaseProps} from '@/common/interfaces';

type AspectRatioSelectorProps = IComponentBaseProps & {
  pickAspectRatios: (keyof typeof ASPECT_RATIO_LIST)[];
  defaultRatioValue: number;
  onChangeRatio: (rate: number) => void;
};

const AspectRatioSelector: FC<AspectRatioSelectorProps> = ({pickAspectRatios, onChangeRatio, defaultRatioValue}) => {
  const [isRatioSelector, setRatioSelector] = useState<number>(defaultRatioValue);

  const getButtonClassName = (value: number) => {
    return classNames('w-full font-bold hover:bg-orange-500', {
      'bg-orange-500': isRatioSelector === value,
      'bg-primary-500': isRatioSelector !== value
    });
  };

  const shouldHideDiv = pickAspectRatios.length === 1 && pickAspectRatios[0] === 'twoToOne';

  return (
    <div className={`flex gap-x-2 overflow-auto pl-4 pr-2 pt-1 ${shouldHideDiv ? 'hidden' : ''}`}>
      {pickAspectRatios.map(ratioItem => (
        <Button
          key={ASPECT_RATIO_LIST[ratioItem].ratio}
          onClick={() => {
            onChangeRatio(ASPECT_RATIO_LIST[ratioItem].ratio);
            setRatioSelector(ASPECT_RATIO_LIST[ratioItem].ratio);
          }}
          className={getButtonClassName(ASPECT_RATIO_LIST[ratioItem].ratio)}
        >
          {ASPECT_RATIO_LIST[ratioItem].label}
        </Button>
      ))}
    </div>
  );
};

export default AspectRatioSelector;
