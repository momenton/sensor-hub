import Loki from 'lokijs';
import config from './config';

const env = process.env.NODE_ENV || 'development';

const db = new Loki(config[env].db.name);

export default db;
