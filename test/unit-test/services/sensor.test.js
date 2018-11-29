import chai, { expect } from 'chai';
import spies from 'chai-spies';
import SensorModel from '../../../server/model/sensor';
import serviceUnderTest from '../../../server/services/sensor';
import NotificationService from '../../../server/services/notification';

chai.use(spies);

describe('SensorService tests', () => {
  afterEach(() => {
    chai.spy.restore(SensorModel);
    chai.spy.restore(NotificationService);
  });

  describe('fetchAll method', () => {
    it('should fetchAll from SensorModel', async () => {
      chai.spy.on(SensorModel, 'fetchAll', returns => []);

      await serviceUnderTest.fetchAll();

      expect(SensorModel.fetchAll).to.have.been.called.with();
    });
  });

  describe('findById method', () => {
    it('should find data by id from SensorModel', async () => {
      const mockResult = {
        id: 'sensor1'
      };

      chai.spy.on(SensorModel, 'findById', returns => mockResult);

      const result = await serviceUnderTest.findById('sensor1');

      expect(SensorModel.findById).to.have.been.called.with.exactly('sensor1');
      expect(result).to.deep.equal(mockResult);
    });

    it('should return not found error if no sensor is found by the given id', async () => {
      const mockResult = {
        id: 'sensor1'
      };

      chai.spy.on(SensorModel, 'findById', returns => null);

      let error = '';
      await serviceUnderTest.findById('sensor1').catch(err => {
        error = err.message;
      });

      expect(error).equal('Not found');
      expect(SensorModel.findById).to.have.been.called.with.exactly('sensor1');
    });
  });

  describe('update method', () => {
    it('should throw error if sensor id does not match', async () => {
      const mockResult = {
        id: 'sensor1'
      };

      chai.spy.on(SensorModel, 'findById', returns => mockResult);

      let error = '';
      await serviceUnderTest.update('sensor1', { id: 'sensor2'}).catch(err => {
        error = err.message;
      });

      expect(error).equal('Invalid request body');
      expect(SensorModel.findById).to.have.been.called.with.exactly('sensor1');
    });

    it('should update sensor data', async () => {
      const mockResult = {
        id: 'sensor1',
        container: 'beer 1',
        minTemperature: 5,
        maxTemperature: 8
      };

      const updateResult = {
        id: 'sensor1',
        container: 'beer 1',
        minTemperature: 5,
        maxTemperature: 8,
        currentTemperature: 6
      };

      chai.spy.on(SensorModel, 'findById', returns => mockResult);
      chai.spy.on(SensorModel, 'update', returns => updateResult);
      chai.spy.on(NotificationService, 'pushNotification');

      const result = await serviceUnderTest.update('sensor1', { currentTemperature: 6 });

      expect(SensorModel.findById).to.have.been.called.with.exactly('sensor1');
      expect(SensorModel.update).to.have.been.called();
      expect(NotificationService.pushNotification).to.not.have.been.called();
      expect(result).to.deep.equal(updateResult);
    });

    it('should push notification if current temperature is lower than minimum', async () => {
      const mockResult = {
        id: 'sensor1',
        container: 'beer 1',
        minTemperature: 5
      };

      const updateResult = {
        id: 'sensor1',
        container: 'beer 1',
        minTemperature: 5,
        currentTemperature: 3
      };

      chai.spy.on(SensorModel, 'findById', returns => mockResult);
      chai.spy.on(SensorModel, 'update', returns => updateResult);
      chai.spy.on(NotificationService, 'pushNotification');

      const result = await serviceUnderTest.update('sensor1', { currentTemperature: 3 });

      expect(SensorModel.findById).to.have.been.called.with.exactly('sensor1');
      expect(SensorModel.update).to.have.been.called();
      expect(NotificationService.pushNotification).to.have.been.called.with.exactly('container beer 1 temperature is out of range.');
      expect(result).to.deep.equal(updateResult);
    });

    it('should push notification if current temperature is higher than maximum', async () => {
      const mockResult = {
        id: 'sensor1',
        container: 'beer 1',
        minTemperature: 4,
        maxTemperature: 5,
      };

      const updateResult = {
        id: 'sensor1',
        container: 'beer 1',
        minTemperature: 4,
        maxTemperature: 5,
        currentTemperature: 6
      };

      chai.spy.on(SensorModel, 'findById', returns => mockResult);
      chai.spy.on(SensorModel, 'update', returns => updateResult);
      chai.spy.on(NotificationService, 'pushNotification');

      const result = await serviceUnderTest.update('sensor1', { currentTemperature: 6 });

      expect(SensorModel.findById).to.have.been.called.with.exactly('sensor1');
      expect(SensorModel.update).to.have.been.called();
      expect(NotificationService.pushNotification).to.have.been.called.with.exactly('container beer 1 temperature is out of range.');
      expect(result).to.deep.equal(updateResult);
    });
  });

  describe('registerSensor method', () => {
    it('should create new sensor info', async () => {
      const sensor = {
        id: 'sensor1',
        container: 'beer 1',
        minTemperature: 4,
        maxTemperature: 5,
      };

      chai.spy.on(SensorModel, 'create', returns => sensor);

      const result = await serviceUnderTest.registerSensor(sensor);

      expect(SensorModel.create).to.have.been.called.with.exactly(sensor);
      expect(result).to.deep.equal(sensor);
    });

    it('should throw error is missing sensor id', async () => {
      const sensor = {
        container: 'beer 1',
        minTemperature: 4,
        maxTemperature: 5,
      };

      let error = '';
      await serviceUnderTest.registerSensor(sensor).catch(err => {
        error = err.message;
      });

      expect(error).equal('Invalid request body');
    });

    it('should throw error is missing container info', async () => {
      const sensor = {
        id: 'sensor1',
        minTemperature: 4,
        maxTemperature: 5,
      };

      let error = '';
      await serviceUnderTest.registerSensor(sensor).catch(err => {
        error = err.message;
      });

      expect(error).equal('Invalid request body');
    });

    it('should throw error is missing minTemperature', async () => {
      const sensor = {
        id: 'sensor1',
        container: 'beer 1',
        maxTemperature: 5
      };

      let error = '';
      await serviceUnderTest.registerSensor(sensor).catch(err => {
        error = err.message;
      });

      expect(error).equal('Invalid request body');
    });

    it('should throw error is missing maxTemperature', async () => {
      const sensor = {
        id: 'sensor1',
        container: 'beer 1',
        minTemperature: 4
      };

      let error = '';
      await serviceUnderTest.registerSensor(sensor).catch(err => {
        error = err.message;
      });

      expect(error).equal('Invalid request body');
    });
  });
});
