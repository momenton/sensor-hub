'use strict';

const applicationServerPublicKey = 'BKf0o4IWFYmXXnw_06WXE92tkFkKWGt01WUN4m0W6pYIvgLp-ydBXQqkRXTikECB7uY0xOu_xtRBuOXKwH-eh2Y';

const pushButton = document.querySelector('.js-push-btn');

let isSubscribed = false;
let swRegistration = null;

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function updateBtn() {
  if (Notification.permission === 'denied') {
    pushButton.textContent = 'Push Messaging Blocked.';
    pushButton.disabled = true;
    return;
  }

  if (isSubscribed) {
    pushButton.textContent = 'Subsribing Sensor Notification';
    pushButton.disabled = true;
  } else {
    pushButton.textContent = 'Subsribe Sensor Notification';
    pushButton.disabled = false;
  }
}

async function subscribeUser() {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  const subscription = await swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  });

  console.log('User is subscribed');

  isSubscribed = true;

  console.log('Sending push');
  await fetch('/api/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'content-type': 'application/json'
    }
  });
  console.log('Sent push');

  updateBtn();
}

function initializeUI() {
  pushButton.addEventListener('click', function() {
    pushButton.disabled = true;
    if (!isSubscribed) {
      subscribeUser();
    }
  });

  // Set the initial subscription value
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    isSubscribed = !(subscription === null);

    if (isSubscribed) {
      console.log('User IS subscribed.');
    } else {
      console.log('User is NOT subscribed.');
    }

    updateBtn();
  });
}


if (window) {
  window.onload = () => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      console.log('Service Worker and Push is supported');

      navigator.serviceWorker.register('sw.js')
      .then(function(swReg) {
        console.log('Service Worker is registered', swReg);

        swRegistration = swReg;
        initializeUI();
      })
      .catch(function(error) {
        console.error('Service Worker Error', error);
      });
    } else {
      console.warn('Push messaging is not supported');
      pushButton.textContent = 'Push Not Supported';
    }
  };
}
