'use client';

import React from 'react';
import Script from 'next/script';

import {mediaStyles} from '@/common/components/media';

import {siteConfigs} from '@/common/constants';

const HeadInjector = () => {
  return (
    <>
      <meta httpEquiv="cleartype" content="yes" />
      <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <style type="text/css" dangerouslySetInnerHTML={{__html: mediaStyles}} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(siteConfigs.schemaJsonLd.organization)}}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(siteConfigs.schemaJsonLd.website)}}
      />
      {/* Only run datadog RUM on docker container */}
      {process.env.NODE_ENV === 'production' && (
        <Script id="datadog-rum">
          {`
      (function(h,o,u,n,d) {
        h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
        d=o.createElement(u);d.async=1;d.src=n
        n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
      })(window,document,'script','https://www.datadoghq-browser-agent.com/ap1/v5/datadog-rum.js','DD_RUM')
      window.DD_RUM.onReady(function() {
        window.DD_RUM.init({
          clientToken: '${process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN}',
          applicationId: '${process.env.NEXT_PUBLIC_DATADOG_APPLICATION_ID}',
          site: 'ap1.datadoghq.com',
          service: '${process.env.NEXT_PUBLIC_DATADOG_SERVICE}',
          env: '${process.env.NEXT_PUBLIC_DATADOG_ENV}',
          // Specify a version number to identify the deployed version of your application in Datadog
          // version: '1.0.0',
          sessionSampleRate: 100,
          sessionReplaySampleRate: 20,
          trackUserInteractions: true,
          trackResources: true,
          trackLongTasks: true,
          defaultPrivacyLevel: 'mask-user-input',
        });
      })
           `}
        </Script>
      )}
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6134841007218610"
        crossOrigin="anonymous"
      ></script>
    </>
  );
};

export default HeadInjector;
