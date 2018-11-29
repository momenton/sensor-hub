import { expect } from 'chai';
import request from 'supertest';
import app from '../../../server/app';

const BASE_URL = '/api/sensors';
const sensor = {
  id: '1',
  container: 'Beer A',
  minTemperature: 4,
  maxTemperature: 6
};

/**
 * Tests for /api/sensors
 */
describe('Sensor controller tests', () => {
  it('should return 400 if any sensor data is missing', done => {
    const sensor = {
      container: 'Beer A',
      minTemperature: 4,
      maxTemperature: 6
    };

    request(app)
      .post(BASE_URL)
      .send(sensor)
      .set('Accept', 'application/json')
      .expect(400);

    done();
  });

  it('should return 201 with new sensor created', done => {
    request(app)
      .post(BASE_URL)
      .send(sensor)
      .set('Accept', 'application/json')
      .expect(201)
      .end((err, res) => {
        const { data } = res.body;
        validateSensorInfo(data, sensor);
      });

    done();
  });

  it('should return 200 with info for all sensors', done => {
    request(app)
      .get(BASE_URL)
      .expect(200)
      .end((err, res) => {
        const { data } = res.body;

        expect(data).to.be.an('array');
        expect(data.length).to.equal(1);
        validateSensorInfo(data[0], sensor);

        done();
      });
  });

  it('should return 200 with queried sensor info', done => {
    request(app)
      .get(`${BASE_URL}/1`)
      .expect(200)
      .end((err, res) => {
        const { data } = res.body;
        validateSensorInfo(data, sensor);

        done();
      });
  });

  it('should return 200 with updated sensor', done => {
    request(app)
      .put(`${BASE_URL}/1`)
      .send({
        currentTemperature: 5
      })
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        const { data } = res.body;
        validateSensorInfo(data, Object.assign({ currentTemperature: 5 }, sensor));
      });

    done();
  });
});

const validateSensorInfo = (sensor, expectedSensor) => {
  expect(sensor).to.have.property('id', expectedSensor.id);
  expect(sensor).to.have.property('container', expectedSensor.container);
  expect(sensor).to.have.property('minTemperature', expectedSensor.minTemperature);
  expect(sensor).to.have.property('maxTemperature', expectedSensor.maxTemperature);
};
