'use client';

import React, {useState} from 'react';

import Input from '../input';

interface InputSpinnerProps {
  value: string;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
}

const InputSpinner: React.FC<InputSpinnerProps> = ({value, onChange, min = -Infinity, max = Infinity}) => {
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    if (isNaN(newValue)) {
      setInputValue('');
      return;
    }
    if (newValue < min) {
      setInputValue(min.toString());
      return;
    }
    if (newValue > max) {
      setInputValue(max.toString());
      return;
    }
    setInputValue(newValue.toString());
    onChange?.(newValue);
  };

  const handleIncrement = () => {
    const newValue = Math.min(parseInt(value) + 1, max);
    setInputValue(newValue.toString());
    onChange?.(newValue);
  };

  const handleDecrement = () => {
    const newValue = Math.max(parseInt(value) - 1, min);
    setInputValue(newValue.toString());
    onChange?.(newValue);
  };

  return (
    <div>
      <button onClick={handleDecrement}>-</button>
      <Input value={inputValue} onChange={handleInputChange} />
      <button onClick={handleIncrement}>+</button>
    </div>
  );
};

export default InputSpinner;
