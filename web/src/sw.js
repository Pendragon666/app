/* eslint-disable no-restricted-globals */
import { precacheAndRoute } from 'workbox-precaching';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';
import { BackgroundSyncPlugin } from 'workbox-background-sync';

precacheAndRoute(self.__WB_MANIFEST || []);

const prefixCacheName = 'test';

const bgSyncPlugin = new BackgroundSyncPlugin('test-sync', {
  maxRetentionTime: 0.5 * 60, // Retry for max of 24 Hours (specified in minutes)
});

registerRoute(
  '/',
  new NetworkFirst({
    cacheName: `${prefixCacheName}-static-resources-main`,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 500,
        maxAgeSeconds: 10 * 24 * 60 * 60, // 10 days
      }),
      new CacheableResponsePlugin({
        statuses: [200],
      }),
      bgSyncPlugin,
    ],
  }),
);

addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
