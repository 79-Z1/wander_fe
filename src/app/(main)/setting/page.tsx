import React from 'react';
import type {Metadata} from 'next';

import SettingModule from '@/modules/setting/setting.module';

export default async function Voucher() {
  return <SettingModule />;
}

export async function generateMetadata(): Promise<Metadata> {
  return {title: 'Setting', description: 'Setting Description'};
}
