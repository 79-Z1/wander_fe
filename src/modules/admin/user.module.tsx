'use client';
import React, {FC, useEffect} from 'react';
import AdminApi from '@/common/api/admin.api';
import {IUser} from '@/common/entities/user.entity';

import {cn} from '@/components/utils';

import {IComponentBaseProps} from '@/common/interfaces';

import UserTable from './components/table';

export type TAdminUserModuleProps = IComponentBaseProps;

const AdminUserModule: FC<TAdminUserModuleProps> = ({className}) => {
  const [users, setUsers] = React.useState<IUser[]>([]);
  useEffect(() => {
    const getUser = async () => {
      const users = await AdminApi.getUsers();
      setUsers(users.metadata);
    };
    getUser();
  }, []);

  function handleUpdateData(status: boolean) {
    if (status) {
      const getUser = async () => {
        const users = await AdminApi.getUsers();
        setUsers(users.metadata);
      };
      getUser();
    }
  }

  return (
    <div className={cn('AdminUserModule', className)} data-testid="AdminUserModule">
      <UserTable users={users} onEdit={handleUpdateData} />
    </div>
  );
};

AdminUserModule.displayName = 'AdminUserModule';

export default AdminUserModule;
