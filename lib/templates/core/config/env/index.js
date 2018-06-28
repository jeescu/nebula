import devConfig from './development';
import prodConfig from './production';

const nodeEnv = process.env.NODE_ENV || 'development';
let envConfig = devConfig;

if (nodeEnv == 'production') {
	envConfig = prodConfig;
}

export default envConfig;