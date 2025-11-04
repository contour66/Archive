'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Stack } from '@/config/contentstack/deliverySDk';

export default function LivePreviewClient() {
  const router = useRouter();

  useEffect(() => {
    const enabled = process.env.NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW === 'true';
    const apiKey  = process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY;
    const env     = process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT;
    if (!enabled || !apiKey || !env) return;

    (async () => {
      try {
        // Handle BOTH export shapes: named and default
        const mod: any = await import('@contentstack/live-preview-utils');
        const LP = mod.ContentstackLivePreview ?? mod.default;
        if (!LP?.init) return;

        LP.init({
          enable: true,
          ssr: false,  // Changed to false since we're in client component
          stackDetails: { apiKey, environment: env },
          stackSdk: Stack.config,  // CRITICAL: Pass the actual Stack SDK instance
          clientUrlParams: { protocol: 'http', host: 'localhost:3000' },
        });

        LP.onEntryChange?.(() => {
          console.log('[Live Preview] Entry changed, refreshing...');
          router.refresh();
        });
      } catch (e) {
        console.error('[CS LP init error]', e);
      }
    })();
  }, [router]);

  return null;
}