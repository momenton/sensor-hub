import HttpStatus from 'http-status-codes';
import NotificationService from '../services/notification';

const controller = {};

/**
 * subscribe web push
 */
controller.subscribe = async (req, res) => {
  const subscription = req.body;
  NotificationService.addSubscribers(subscription);
  NotificationService.pushNotification('Subscribed successfully!');

  res.status(HttpStatus.CREATED).json({});
};

export default controller;
