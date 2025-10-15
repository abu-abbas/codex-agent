import { register } from 'register-service-worker';

export function registerSW() {
  if (import.meta.env.PROD && 'serviceWorker' in navigator) {
    register('/service-worker.js', {
      ready() {
        console.info('App is being served from cache by a service worker.');
      },
      registered() {
        console.info('Service worker has been registered.');
      },
      cached() {
        console.info('Content has been cached for offline use.');
      },
      updatefound() {
        console.info('New content is downloading.');
      },
      updated() {
        console.info('New content is available; please refresh.');
      },
      offline() {
        console.info('No internet connection found. App is running in offline mode.');
      },
      error(error) {
        console.error('Error during service worker registration:', error);
      }
    });
  }
}
