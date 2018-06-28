import path from 'path';
import environmentConfig from './env';
import { merge } from 'lodash';

// Default configurations applied to all environments
const defaultConfig = {
    env: environmentConfig.name,
    environment: {
        [environmentConfig.name]: true
    },
    version: require('../package.json').version,
    root: path.normalize(__dirname + '/../..'),
    port: process.env.PORT || 9000,
    ip: process.env.IP || '0.0.0.0',
    apiPrefix: '',
    /**
     * Security configuration options regarding sessions, authentication and hashing
     */
    security: {
        sessionSecret: process.env.SESSION_SECRET || 'abcd1234',
        sessionExpiration: process.env.SESSION_EXPIRATION || 60 * 60 * 24 * 7, // 1 week
        saltRounds: process.env.SALT_ROUNDS || 12,
    }
};

export default merge(defaultConfig, environmentConfig);
