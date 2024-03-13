import React, {FC} from 'react';

import {Icon} from '@/core-ui';

import {cn} from '@/components/utils';

import {IComponentBaseProps} from '@/common/interfaces';

export type TSearchProps = IComponentBaseProps;

const Search: FC<TSearchProps> = ({className}) => {
  return (
    <div className={cn('search flex w-80 gap-2 rounded-lg bg-gray-100 px-2 py-3', className)} data-testid="Search">
      <Icon name="ico-search" />
      <input className="w-full text-ellipsis bg-gray-100 outline-none" placeholder="Search" />
    </div>
  );
};

Search.displayName = 'Search';

export default Search;
