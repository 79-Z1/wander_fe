import React from 'react';
import type {Metadata} from 'next';
import UserApi from '@/common/api/user.api';
import {ROUTES} from '@/common/configs/routes.config';

import ProfileModule from '@/modules/users/user-profile.module';

import {siteConfigs} from '@/common/constants';

type CreateProfilePageProps = {params: {slug: string}; searchParams: Record<string, string>};

export default async function CreateProfileMainPage({params}: CreateProfilePageProps) {
  return <ProfileModule slug={params.slug} />;
}

export async function generateMetadata({params: {slug}}: CreateProfilePageProps): Promise<Metadata> {
  try {
    const data = await UserApi.getUserProfileBySlugSeverSide(slug);
    if (!data) return {};

    const url = `${siteConfigs.url}/${ROUTES.CHAT}/${slug}`;
    const title = data.user.name;
    const description = data.user.name;
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
