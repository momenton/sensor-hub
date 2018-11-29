'use strict';

self.addEventListener('push', event => {
  const data = event.data.json();

  const options = {
    body: data.message,
    icon: 'images/icon.png',
    badge: 'images/badge.png'
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});
