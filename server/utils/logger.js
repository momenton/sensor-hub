import winston from 'winston';
import config from '../config';

const env = process.env.NODE_ENV || 'development';
const level = process.env.LOGGING_LEVEL || config[env].logging.level;

winston.addColors({
  info: 'green',
  warn: 'cyan',
  error: 'red',
  verbose: 'blue',
  i: 'gray',
  db: 'magenta'
});

const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({ 
      level, 
      colorize: false, 
      timestamp: true 
    })
  ]
});

export default logger;
