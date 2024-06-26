import {type KeyboardEvent, useCallback, useRef, useState} from 'react';
import Image from 'next/image';
import {Command as CommandPrimitive} from 'cmdk';

import {CommandGroup, CommandInput, CommandItem, CommandList} from '@/components/ui/command';
import {Skeleton} from '@/components/ui/skeleton';
import {cn} from '@/components/utils';

import {IMAGE_URL} from '../constants';
import {IUser} from '../entities/user.entity';

export type Option = Record<'value' | 'label', string> & Record<string, string>;

type SearchBarSuggestionProps = {
  users: IUser[];
  emptyMessage: string;
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
  onValueChange?: (value: string) => void;
  onSelectOption?: (userId: string) => void;
  onEnter?: (value: string) => void;
};

const SearchBarSuggestion = ({
  users,
  placeholder,
  emptyMessage,
  disabled,
  isLoading = false,
  onEnter,
  onValueChange,
  onSelectOption
}: SearchBarSuggestionProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (!input) {
        return;
      }

      // Keep the options displayed when the user is typing
      if (!isOpen) {
        setOpen(true);
      }

      // This is not a default behaviour of the <input /> field
      if (event.key === 'Enter' && input.value !== '') {
        onEnter?.(inputValue);
      }

      if (event.key === 'Escape') {
        input.blur();
      }
    },
    [isOpen, inputValue, onEnter]
  );

  const handleSelectOption = useCallback(
    (selectedOption: IUser) => {
      setInputValue(selectedOption.name || '');

      onValueChange?.(inputValue);
      onSelectOption?.(selectedOption._id || '');

      setTimeout(() => {
        inputRef?.current?.blur();
      }, 0);
    },
    [onValueChange, onSelectOption]
  );

  const handleInputChange = (text: string) => {
    setInputValue(text);
    onValueChange?.(text);
  };

  return (
    <CommandPrimitive onKeyDown={handleKeyDown}>
      <div>
        <CommandInput
          ref={inputRef}
          value={inputValue}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          disabled={disabled}
          className="rounded-lg border-none bg-gray-100 text-base outline-none"
          onValueChange={isLoading ? undefined : text => handleInputChange(text)}
          onBlur={() => setOpen(false)}
        />
      </div>
      <div className="relative mt-1">
        {isOpen ? (
          <div className="absolute top-0 z-10 w-full rounded-xl bg-stone-50 outline-none animate-in fade-in-0 zoom-in-95">
            <CommandList className="rounded-lg ring-1 ring-slate-200">
              {isLoading ? (
                <CommandPrimitive.Loading>
                  <div className="p-1">
                    <Skeleton className="h-8 w-full" />
                  </div>
                </CommandPrimitive.Loading>
              ) : null}
              {users?.length > 0 && !isLoading ? (
                <CommandGroup className="scrollbar max-h-[300px] overflow-y-auto">
                  {users.map(option => {
                    return (
                      <CommandItem
                        key={option._id}
                        value={option.name}
                        onMouseDown={event => {
                          event.preventDefault();
                          event.stopPropagation();
                        }}
                        onSelect={() => handleSelectOption(option)}
                        className={cn('flex w-full cursor-pointer items-center gap-2 hover:bg-opacity-50')}
                      >
                        <Image
                          src={option.avatar || IMAGE_URL.USER}
                          width={40}
                          height={40}
                          alt={option.name || ''}
                          className="rounded-full"
                        />
                        <span>{option.name}</span>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              ) : null}
              {!isLoading && inputValue ? (
                <CommandPrimitive.Empty className="select-none rounded-sm px-2 py-3 text-center text-sm">
                  {emptyMessage}
                </CommandPrimitive.Empty>
              ) : null}
            </CommandList>
          </div>
        ) : null}
      </div>
    </CommandPrimitive>
  );
};

export default SearchBarSuggestion;
