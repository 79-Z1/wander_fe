import React, {FC} from 'react';
import {IPlan} from '@/common/entities';

import {cn} from '@/components/utils';

import {DataTable} from '@/common/components/table-pagination/data-table';

import {IComponentBaseProps} from '@/common/interfaces';

import {columns} from './columns';

export type TPlanTableCardProps = IComponentBaseProps & {
  plans: IPlan[];
};

const PlanTableCard: FC<TPlanTableCardProps> = ({className, plans}) => {
  return (
    <div className={cn('PlanTableCard rounded-lg bg-zinc-50 p-3 shadow', className)} data-testid="PlanTableCard">
      <p className="mb-3 text-[18px] font-bold">Kế hoạch</p>
      <DataTable data={plans} columns={columns} />
    </div>
  );
};

PlanTableCard.displayName = 'PlanTableCard';

export default PlanTableCard;
