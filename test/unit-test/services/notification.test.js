import chai, { expect } from 'chai';
import spies from 'chai-spies';
import webpush from '../../../server/webpush';
import serviceUnderTest from '../../../server/services/notification';

chai.use(spies);

describe('NotificationService tests', () => {
  afterEach(() => {
    chai.spy.restore(webpush);
  });

  describe('pushNotification method', () => {
    it('should push notification to all subscribers', () => {
      const subscriber1 = {
        id: 1
      };

      const subscriber2 = {
        id: 2
      };

      const payload = JSON.stringify({
        title: 'Notification From Sensor',
        message: 'message'
      });

      chai.spy.on(webpush, 'sendNotification');

      serviceUnderTest.addSubscribers(subscriber1);
      serviceUnderTest.addSubscribers(subscriber2);

      serviceUnderTest.pushNotification('message');

      expect(webpush.sendNotification).to.have.been.called.with.exactly(subscriber1, payload);
      expect(webpush.sendNotification).to.have.been.called.with.exactly(subscriber2, payload);
    });
  });
});
