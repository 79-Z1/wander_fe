import React from 'react';
import type {Metadata} from 'next';
import {ResetPasswordApi} from '@/common/api';
import {ROUTES} from '@/common/configs/routes.config';

import ResetPasswordForm from '@/modules/forgot-password/reset-password-form';
import NotFoundModule from '@/modules/not-found/not-found';

import {siteConfigs} from '@/common/constants';

type CreateResetPasswordPageProps = {params: {slug: string}; searchParams: Record<string, string>};

export default async function CreateResetPasswordMainPage({params}: CreateResetPasswordPageProps) {
  const data = await ResetPasswordApi.readValidResetPasswordToken(params.slug);

  if (!data) return <NotFoundModule />;

  return <ResetPasswordForm token={params.slug} />;
}

export async function generateMetadata({params: {slug}}: CreateResetPasswordPageProps): Promise<Metadata> {
  try {
    const data = await ResetPasswordApi.readValidResetPasswordToken(slug);
    if (!data) return {};

    const url = `${siteConfigs.url}/${ROUTES.RESET_PASSWORD}/${slug}`;
    const title = 'Reset Password';
    const description = 'Reset Password Description';
    const imageUrl = `${siteConfigs.url}/og-img.jpg`;
    const imageAlt = siteConfigs.appName;

    return {
      title,
      description,
      twitter: {
        title,
        card: 'summary_large_image',
        site: '@site',
        creator: '@creator',
        images: imageUrl
      },
      openGraph: {
        url,
        siteName: siteConfigs.appName,
        title,
        description,
        type: 'website',
        images: [{alt: imageAlt, url: imageUrl, width: 1200, height: 630}]
      },
      alternates: {
        canonical: url
      }
    };
  } catch {
    return {};
  }
}
