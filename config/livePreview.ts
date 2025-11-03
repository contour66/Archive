'use client';

import { ContentstackLivePreview } from '@contentstack/live-preview-utils';

export const initLivePreview = () => {
  if (typeof window === 'undefined') return;

  ContentstackLivePreview.init({
    enable: process.env.NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW === 'true',
    ssr: true,
    stackDetails: {
      apiKey: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY!,
      environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT!,
    },
    // Optionally map content types to routes if your URLs differ
    clientUrlParams: {
      protocol: 'http',
      host: 'localhost:3000',
    },
  });
};