import React from 'react';
import type {Metadata} from 'next';
import ScheduleApi from '@/common/api/schedule.api';
import {ROUTES} from '@/common/configs/routes.config';

import NotFoundModule from '@/modules/not-found/not-found';
import TripDetailModule from '@/modules/schedules/components/trip-detail/trip-detail.module';

import {siteConfigs} from '@/common/constants';

type CreateTripPageProps = {params: {slug: string}; searchParams: Record<string, string>};

export default async function CreateChatMainPage({params}: CreateTripPageProps) {
  const data = await ScheduleApi.readScheduleBySlugSeverSide(params.slug);

  if (!data) return <NotFoundModule />;

  return <TripDetailModule schedule={data} />;
}

export async function generateMetadata({params: {slug}}: CreateTripPageProps): Promise<Metadata> {
  try {
    const data = await ScheduleApi.readScheduleBySlugSeverSide(slug);
    if (!data) return {};

    const url = `${siteConfigs.url}/${ROUTES.TRIP}/${slug}`;
    const title = data.topic;
    const description = data.description;
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
