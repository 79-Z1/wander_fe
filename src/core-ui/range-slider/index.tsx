'use client';

import {ChangeEvent, FC, useCallback, useEffect, useRef, useState} from 'react';
import classNames from 'classnames';

import {ICoreUIBaseProps} from '../types';

interface IRangeSliderProps extends ICoreUIBaseProps {
  min: number;
  max: number;
  step: number;
  values: {min: number; max: number};
  onChange: (value: {min: number; max: number}) => void;
}

const RangeSlider: FC<IRangeSliderProps> = ({className, visible = true, min, max, step, values, onChange}) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef<HTMLInputElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);
  const range = useRef<HTMLDivElement>(null);

  const getPercent = useCallback(
    (value: number) => {
      return Math.round(((value - min) / (max - min)) * 100);
    },
    [minVal, maxVal]
  );

  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(values.min === 0 ? minVal : values.min);

      const maxPercent = getPercent(+maxValRef.current.value);

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    if (minValRef.current) {
      const maxPercent = getPercent(values.max === 0 ? maxVal : values.max);
      const minPercent = getPercent(+minValRef.current.value);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  useEffect(() => {
    onChange({min: minVal, max: maxVal});
  }, [minVal, maxVal]);

  if (!visible) return null;

  return (
    <div className={classNames('relative', className)}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={values.min === 0 ? minVal : values.min}
        ref={minValRef}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const value = Math.min(+event.target.value, maxVal - 1);
          values.min = 0;
          setMinVal(value);
          event.target.value = value.toString();
        }}
        className={classNames('thumb thumb--zindex-3', {
          'thumb--zindex-5': minVal > max - 100
        })}
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={values.max === 0 ? maxVal : values.max}
        ref={maxValRef}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const value = Math.max(+event.target.value, minVal + 1);
          values.max = 0;
          setMaxVal(value);
          event.target.value = value.toString();
        }}
        className="thumb thumb--zindex-4"
      />

      <div className="slider">
        <div className="slider__track"></div>
        <div ref={range} className="slider__range"></div>
      </div>
    </div>
  );
};

RangeSlider.displayName = 'ABCPriceSlider';

export default RangeSlider;
