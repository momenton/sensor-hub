import db from '../db';

const SCHEMA_NAME = 'sensor';
const sensors = db.addCollection(SCHEMA_NAME);

const SensorModel = {};

// eslint-disable-next-line quote-props
SensorModel.fetchAll = () => sensors.find();
SensorModel.findById = id => sensors.findOne({ id: { '$eq': id } });
SensorModel.create = sensor => sensors.insert(sensor);
SensorModel.update = sensor => sensors.update(sensor);

export default SensorModel;
export { SCHEMA_NAME };
