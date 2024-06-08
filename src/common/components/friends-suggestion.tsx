'use client';
import React, {FC, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import Image from 'next/image';
import {Command as CommandPrimitive} from 'cmdk';
import {X} from 'lucide-react';
import {IUser} from '@/common/entities/user.entity';

import {Badge} from '@/components/ui/badge';
import {Command, CommandGroup, CommandItem} from '@/components/ui/command';

import {IComponentBaseProps} from '@/common/interfaces';

import {IMAGE_URL} from '../constants';

export type TFriendsSuggestionProps = IComponentBaseProps & {
  friends: IUser[];
  defaultSelectedList?: any[];
  onClick?: (friendsSelected: IUser[]) => void;
};

const FriendsSuggestion: FC<TFriendsSuggestionProps> = ({friends, defaultSelectedList = [], onClick}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<IUser[]>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setSelected(defaultSelectedList);
  }, [defaultSelectedList]);

  const handleUnselect = useCallback(
    (removed: IUser) => {
      setSelected(prev => {
        const newSelected = prev.filter(s => s._id !== removed._id);
        if (onClick) {
          // Sử dụng setTimeout để đảm bảo onClick được gọi sau khi render hoàn tất
          setTimeout(() => onClick(newSelected), 0);
        }
        return newSelected;
      });
    },
    [onClick]
  );

  const handleSelect = useCallback(
    (added: IUser) => {
      setSelected(prev => {
        const newSelected = [...prev, added];
        if (onClick) {
          // Sử dụng setTimeout để đảm bảo onClick được gọi sau khi render hoàn tất
          setTimeout(() => onClick(newSelected), 0);
        }
        return newSelected;
      });
      setInputValue('');
    },
    [onClick]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === 'Delete' || e.key === 'Backspace') {
          if (input.value === '') {
            setSelected(prev => {
              const newSelected = prev.slice(0, -1);
              if (onClick) {
                // Sử dụng setTimeout để đảm bảo onClick được gọi sau khi render hoàn tất
                setTimeout(() => onClick(newSelected), 0);
              }
              return newSelected;
            });
          }
        }
        if (e.key === 'Escape') {
          input.blur();
        }
      }
    },
    [onClick]
  );

  const selectables = useMemo(() => {
    return friends.filter(f => !selected.some(s => s._id === f._id));
  }, [friends, selected]);

  return (
    <Command onKeyDown={handleKeyDown} className="overflow-visible bg-transparent">
      <div className="group rounded-md border border-input px-2 py-3 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {selected.map(user => (
            <Badge key={user._id} className="rounded-lg bg-[rgba(234,88,12,0.22)] p-1">
              <Image
                width={32}
                height={32}
                className="rounded-lg"
                src={user.avatar || IMAGE_URL.USER}
                alt={user.name || ''}
              />
              <span className="ml-2 text-base text-orange-500">{user.name}</span>
              <button
                className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    handleUnselect(user);
                  }
                }}
                onMouseDown={e => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={() => handleUnselect(user)}
              >
                <X className="h-4 w-4 text-orange-500 hover:text-foreground" />
              </button>
            </Badge>
          ))}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder="Thêm thành viên..."
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="relative mt-2">
        {open && selectables.length > 0 ? (
          <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup className="h-full overflow-auto">
              {selectables.map(user => (
                <CommandItem
                  key={user._id}
                  onMouseDown={e => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onSelect={() => handleSelect(user)}
                  className="cursor-pointer"
                >
                  <Image width={32} height={32} src={user.avatar || IMAGE_URL.USER} alt={user.name || ''} />
                  <span className="ml-2 text-base text-orange-500">{user.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </div>
        ) : null}
      </div>
    </Command>
  );
};

export default FriendsSuggestion;
