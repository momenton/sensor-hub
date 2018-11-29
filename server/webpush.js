import webpush from 'web-push';
import config from './config';

const env = process.env.NODE_ENV || 'development';
const keys = process.env.notificationKey || config[env].notificationKey;

webpush.setVapidDetails('mailto:wayne.hong@momenton.com.au', keys.public, keys.private);

export default webpush;
