'use client';
import React, {FC} from 'react';

import NotFoundScreen from '@/common/components/not-found';

import {IComponentBaseProps} from '@/common/interfaces';

interface INotFoundModuleProps extends IComponentBaseProps {}

const NotFoundModule: FC<INotFoundModuleProps> = () => {
  return <NotFoundScreen />;
};

NotFoundModule.displayName = 'NotFoundModule';

export default NotFoundModule;
