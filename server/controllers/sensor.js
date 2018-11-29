import HttpStatus from 'http-status-codes';
import SensorService from '../services/sensor';

const controller = {};

/**
 * fetch all sensors
 */
controller.fetchAll = async (req, res) => {
  const data = await SensorService.fetchAll();
  res.json({ data });
};

/**
 * query sensor info by id
 */
controller.findById = async (req, res) => {
  const { id } = req.params;
  const data = await SensorService.findById(id);
  res.json({ data} );
};

/**
 * update sensor info.
 *
 * @param {object} req
 * @param {object} res
 */
controller.update = async (req, res) => {
  const { id } = req.params;
  const data = await SensorService.update(id, req.body);
  res.json({ data });
};

/**
 * register a sensor and container
 */
controller.register = async (req, res) => {
  const data = await SensorService.registerSensor(req.body);
  res.status(HttpStatus.CREATED).json({ data });
}

export default controller;
