import React, {FC, useState} from 'react';
import Image from 'next/image';

import {Input} from '@/core-ui';

import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {cn} from '@/components/utils';

import {IComponentBaseProps} from '@/common/interfaces';

interface IFriendData {
  id: number;
  name: string;
  image: string;
}

interface IFriendSuggestionProps extends IComponentBaseProps {
  placeholder?: string;
  restInput?: any;
  errors?: boolean;
  selectedFriends?: IFriendData[];
  onFriendSelection?: (friend: IFriendData) => void;
  onFriendDeselection?: (friendId: number) => void;
}

const FriendSuggestion: FC<IFriendSuggestionProps> = ({className, restInput, ...rest}) => {
  const [selectedFriends, setSelectedFriends] = useState<IFriendData[]>([]);

  // Function to add a friend to the selectedFriends array
  const handleFriendSelection = (friend: IFriendData) => {
    setSelectedFriends([...selectedFriends, friend]);
  };

  // Function to remove a friend from the selectedFriends array
  const handleFriendDeselection = (friendId: number) => {
    setSelectedFriends(selectedFriends.filter(f => f.id !== friendId));
  };

  return (
    <div className={cn('friend-suggestion', className)} data-testid="FriendsSuggestion" {...rest}>
      <Popover>
        <PopoverTrigger defaultChecked={false} asChild>
          <div className="flex items-center justify-between gap-x-1 hover:cursor-pointer">
            <Input {...restInput} />
          </div>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="flex h-fit w-fit flex-col gap-1 space-y-2 rounded-lg bg-[#F3F4F6] p-2 px-3 py-2"
        >
          <p className="font-bold">Gợi ý</p>
          {([] as IFriendData[]).map(friend => (
            <div key={friend.id} className="flex items-center gap-2 py-3">
              <Image src={friend.image || ''} alt={friend.name} width={40} height={40} className="rounded-full" />
              <p className="font-bold">{friend.name}</p>
              {!selectedFriends.includes(friend) ? (
                <button onClick={() => handleFriendSelection(friend)}>Add</button>
              ) : (
                <button onClick={() => handleFriendDeselection(friend.id)}>Remove</button>
              )}
            </div>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
};

FriendSuggestion.displayName = 'FriendSuggestion';

export default FriendSuggestion;
