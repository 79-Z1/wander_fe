import React from 'react';
import type {Metadata} from 'next';

import ForgotPassWordModule from '@/modules/forgot-password/forgot-password.module';

export default async function Calendar() {
  return <ForgotPassWordModule />;
}

export async function generateMetadata(): Promise<Metadata> {
  return {title: 'ForgotPassword', description: 'ForgotPassword Description'};
}
