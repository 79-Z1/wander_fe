'use client';

import * as React from 'react';
import {ChevronDown, ChevronUp} from 'lucide-react';
import {IConversationDisplay} from '@/common/entities';

import {Button} from '@/components/ui/button';
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from '@/components/ui/collapsible';
import {cn} from '@/components/utils';

import {IComponentBaseProps} from '@/common/interfaces';

import FriendAvatarSection from './friend-avatar-section';

export type TChatCollapsibleProps = IComponentBaseProps & {
  triggerText?: string;
  coversations: IConversationDisplay[];
  onClick?: (conversationId?: string) => void;
};

const ChatCollapsible: React.FC<TChatCollapsibleProps> = ({className, coversations, triggerText, onClick}) => {
  const [isOpen, setIsOpen] = React.useState(true);

  function handleClick(conversationId?: string) {
    onClick?.(conversationId);
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
      <div className={cn('flex items-center justify-between', className)}>
        <p className="mb-3 text-xl font-bold">{triggerText}</p>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2">
        {coversations.length > 0 ? (
          coversations.map((contact, index) => (
            <FriendAvatarSection key={index} contact={contact} onClick={handleClick} />
          ))
        ) : (
          <></>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ChatCollapsible;
