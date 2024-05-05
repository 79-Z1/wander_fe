'use client';

import {FC} from 'react';
import {Bar, BarChart, ResponsiveContainer, XAxis, YAxis} from 'recharts';

import {IComponentBaseProps} from '@/common/interfaces';
import {IStatistic} from '@/common/interfaces/admin.interface';

type TAdminOverviewProps = IComponentBaseProps & {
  data: IStatistic[];
};
const Overview: FC<TAdminOverviewProps> = ({data}) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={value => `${value}`} />
        <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Overview;
