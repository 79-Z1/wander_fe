'use client';
import React, {FC, useEffect} from 'react';
import AdminApi from '@/common/api/admin.api';

import LoadingSection from '@/core-ui/loading/loading-section';

import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {cn} from '@/components/utils';

import {IComponentBaseProps} from '@/common/interfaces';
import {IStaticThisMonth, IStatistic} from '@/common/interfaces/admin.interface';

import Overview from '../../modules/admin/components/overview';

import AdminCard from './components/card';
import Ranking from './components/ranking';

export type TAdminOverviewModuleProps = IComponentBaseProps;

const AdminOverviewModule: FC<TAdminOverviewModuleProps> = ({className}) => {
  const [scheduleStatistic, setScheduleStatistic] = React.useState<IStatistic[]>([]);
  const [userCount, setUserCount] = React.useState<IStaticThisMonth>();
  const [scheduleCount, setScheduleCount] = React.useState<IStaticThisMonth>();
  const [ranking, setRanking] = React.useState<any[]>([]);

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
    const getRanking = async () => {
      return await AdminApi.getRanking();
    };
    const getData = async () => {
      await Promise.all([getScheduleData(), getUserCount(), getScheduleCount(), getRanking()]).then(
        ([data, user, schedule, ranking]) => {
          setScheduleStatistic(data.metadata);
          setUserCount(user.metadata);
          setScheduleCount(schedule.metadata);
          setRanking(ranking.metadata);
        }
      );
    };
    getData();
  }, []);

  return (
    <div className={cn('AdminOverviewModule', className)} data-testid="AdminOverviewModule">
      <div className="grid grid-cols-2 gap-4">
        {!scheduleCount ? (
          <LoadingSection />
        ) : (
          <AdminCard
            title="Số người dùng mới"
            mainContent={`+${userCount?.thisMonth}`}
            subContent={`+${userCount?.diff} so với tháng trước`}
            icon="user"
          />
        )}
        {!scheduleCount ? (
          <LoadingSection />
        ) : (
          <AdminCard
            title="Số lịch trình mới"
            mainContent={`+${scheduleCount?.thisMonth}`}
            subContent={`+${scheduleCount?.diff} so với tháng trước`}
            icon="user"
          />
        )}
      </div>
      <div className="mt-5 grid gap-4">
        <Card className="shadow">
          <CardHeader className="px-6 font-bold">
            <CardTitle>Số lịch trình theo từng tháng</CardTitle>
          </CardHeader>
          <CardContent>
            <Overview data={scheduleStatistic} />
          </CardContent>
        </Card>
        <Card className="p-6 shadow">
          <CardHeader className="p-0 pb-3">
            <CardTitle>Bảng xếp hạng</CardTitle>
          </CardHeader>
          <CardContent>
            <Ranking />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

AdminOverviewModule.displayName = 'AdminOverviewModule';

export default AdminOverviewModule;
