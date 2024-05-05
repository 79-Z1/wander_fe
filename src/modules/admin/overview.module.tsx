'use client';
import React, {FC, useEffect} from 'react';
import AdminApi from '@/common/api/admin.api';

import {Loading} from '@/core-ui';

import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {cn} from '@/components/utils';

import {IComponentBaseProps} from '@/common/interfaces';
import {IStaticThisMonth, IStatistic} from '@/common/interfaces/admin.interface';

import Overview from '../../modules/admin/components/overview';
import RecentSales from '../../modules/admin/components/recent-sales';

import AdminCard from './components/card';

export type TAdminOverviewModuleProps = IComponentBaseProps;

const AdminOverviewModule: FC<TAdminOverviewModuleProps> = ({className}) => {
  const [scheduleStatistic, setScheduleStatistic] = React.useState<IStatistic[]>([]);
  const [userCount, setUserCount] = React.useState<IStaticThisMonth>();
  const [scheduleCount, setScheduleCount] = React.useState<IStaticThisMonth>();

  useEffect(() => {
    const getScheduleData = async () => {
      return await AdminApi.getStatistic();
    };
    const getUserCount = async () => {
      return await AdminApi.getUserStatistic();
    };
    const getScheduleCount = async () => {
      return await AdminApi.getScheduleStatistic();
    };
    const getData = async () => {
      await Promise.all([getScheduleData(), getUserCount(), getScheduleCount()]).then(([data, user, schedule]) => {
        setScheduleStatistic(data.metadata);
        setUserCount(user.metadata);
        setScheduleCount(schedule.metadata);
      });
    };
    getData();
  }, []);

  return (
    <div className={cn('AdminOverviewModule', className)} data-testid="AdminOverviewModule">
      <div className="grid grid-cols-2 gap-4">
        {!scheduleCount ? (
          <Loading />
        ) : (
          <AdminCard
            title="Số người dùng mới"
            mainContent={`+${userCount?.thisMonth}`}
            subContent={`+${userCount?.diff} so với tháng trước`}
            icon="user"
          />
        )}
        {!scheduleCount ? (
          <Loading />
        ) : (
          <AdminCard
            title="Số lịch trình mới"
            mainContent={`+${scheduleCount?.thisMonth}`}
            subContent={`+${scheduleCount?.diff} so với tháng trước`}
            icon="user"
          />
        )}
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 shadow">
          <CardHeader></CardHeader>
          <CardContent>
            <Overview data={scheduleStatistic} />
          </CardContent>
        </Card>
        <Card className="col-span-3 p-6 shadow">
          <CardHeader className="p-0 pb-3">
            <CardTitle>Bảng xếp hạng</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentSales />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

AdminOverviewModule.displayName = 'AdminOverviewModule';

export default AdminOverviewModule;
