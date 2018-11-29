import SensorModel from '../model/sensor';
import NotificationService from './notification';

const service = {};

service.fetchAll = async () => await SensorModel.fetchAll();

service.findById = async id => {
  const data = await SensorModel.findById(id);
  if (!data) throw new Error('Not found');
  return data;
};

service.update = async (id, newData) => {
  const data = await service.findById(id);

  if (!!newData.id && id !== newData.id) {
    throw new Error('Invalid request body');
  }

  const changedData = Object.assign(data, newData);
  await SensorModel.update(changedData);

  if (changedData.currentTemperature < changedData.minTemperature || changedData.currentTemperature > changedData.maxTemperature) {
    NotificationService.pushNotification(`container ${changedData.container} temperature is out of range.`);
  }

  return changedData;
};

service.registerSensor = async (sensor) => {
  if (!sensor.id || !sensor.container || !Number.isInteger(parseInt(sensor.minTemperature)) || !Number.isInteger(parseInt(sensor.maxTemperature))) {
    throw new Error('Invalid request body');
  }
  return await SensorModel.create(sensor);
};

export default service;
