'use client';

import React, {FC, ReactNode} from 'react';
import classNames from 'classnames';

import {Content, ITabContentProps} from './content';
import {ITabItemProps, Item} from './item';
import {ITabListProps, List} from './list';
import {ITabPanelProps, Panel} from './panel';
import {Provider} from './state';

interface ITabsComposition {
  List: FC<ITabListProps>;
  Item: FC<ITabItemProps>;
  Panel: FC<ITabPanelProps>;
  Content: FC<ITabContentProps>;
}

interface ITabsProps {
  className?: string;
  visible?: boolean;
  children: ReactNode;
}

const Tabs: FC<ITabsProps> & ITabsComposition = ({className, children, visible = true}) => {
  if (!visible) return null;

  return (
    <Provider>
      <div className={classNames('abc-tab', className)}>{children}</div>
    </Provider>
  );
};

Tabs.Item = Item;
Tabs.List = List;
Tabs.Content = Content;
Tabs.Panel = Panel;

export default Tabs;
