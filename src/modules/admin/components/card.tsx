import React, {FC} from 'react';

import {Icon} from '@/core-ui';

import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {cn} from '@/components/utils';

import {IComponentBaseProps} from '@/common/interfaces';

export type TAdminCardProps = IComponentBaseProps & {
  title?: string;
  mainContent?: string;
  subContent?: string;
  icon?: string;
};

const AdminCard: FC<TAdminCardProps> = ({className, title, mainContent, subContent, icon}) => {
  return (
    <div className={cn('AdminCard', className)} data-testid="AdminCard">
      <Card className="p-6 shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <Icon name={`ico-${icon}`} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mainContent}</div>
          <p className="text-xs text-muted-foreground">{subContent}</p>
        </CardContent>
      </Card>
    </div>
  );
};

AdminCard.displayName = 'AdminCard';

export default AdminCard;
