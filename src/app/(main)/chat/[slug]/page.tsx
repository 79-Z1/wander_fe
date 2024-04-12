import React from 'react';
import type {Metadata} from 'next';
import ChatApi from '@/common/api/chat.api';
import {ROUTES} from '@/common/configs/routes.config';

import ChatModule from '@/modules/chat/chat-module';
import NotFoundModule from '@/modules/not-found/not-found';

import {siteConfigs} from '@/common/constants';

type CreateChatPageProps = {params: {slug: string}; searchParams: Record<string, string>};

export default async function CreateChatMainPage({params}: CreateChatPageProps) {
  const data = await ChatApi.readConversationBySlugSeverSide(params.slug);

  if (!data) return <NotFoundModule />;

  return (
    <div className="h-full w-full">
      <ChatModule conversation={data} />
    </div>
  );
}

export async function generateMetadata({params: {slug}}: CreateChatPageProps): Promise<Metadata> {
  try {
    const data = await ChatApi.readConversationBySlugSeverSide(slug);
    if (!data) return {};

    const url = `${siteConfigs.url}/${ROUTES.CHAT}/${slug}`;
    const title = data.name;
    const description = data.name;
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
