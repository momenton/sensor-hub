import logger from '../utils/logger';
import webpush from '../webpush';

const service = {};
const title = 'Notification From Sensor';
const subscribers = new Set();

service.addSubscribers = subscriber => subscribers.add(subscriber);
service.pushNotification = message => {
  const payload = JSON.stringify({
    title,
    message
  });
  subscribers.forEach(subscriber => {
    logger.info(`send ${payload} to ${subscriber}`);
    webpush.sendNotification(subscriber, payload).catch(error => logger.error(error));
  });
};

export default service;
