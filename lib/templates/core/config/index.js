import path from 'path';
import { merge } from 'lodash';

// Default configuations applied to all environments
const nodeEnv = process.env.NODE_ENV || 'development';
const defaultConfig = {
    env: nodeEnv,
    get envs() {
        return {
            test: nodeEnv === 'test',
            development: nodeEnv === 'development',
            production: nodeEnv === 'production',
        };
    },

    version: require('../../package.json').version,
    root: path.normalize(__dirname + '/../../..'),
    port: process.env.PORT || 4567,
    ip: process.env.IP || '0.0.0.0',
    apiPrefix: '', // Could be /api/resource or /api/v2/resource

    /**
     * Security configuation options regarding sessions, authentication and hashing
     */
    security: {
        sessionSecret: process.env.SESSION_SECRET || '[xapp]tqbfj0t14',
        sessionExpiration: process.env.SESSION_EXPIRATION || 60 * 60 * 24 * 7, // 1 week
        saltRounds: process.env.SALT_ROUNDS || 12,
    }
};

// Environment specific overrides
const environmentConfigs = {
    development: {
        db: {
            debug: true,
            client: 'mysql',
            connection: {
                host : 'localhost',
                port: "3306",
                user : 'xproj_dev',
                password : 'xproj_dev',
                database : 'xproj_dev'
            },
            pool: { 
                min: 2, 
                max: 10 
            }
        }
    },
    test: {
        port: 5678,
        db: {}
    },
    production: {
        db: {}
    }
};

// Recursively merge configurations
export default merge(defaultConfig, environmentConfigs[nodeEnv] || {});
