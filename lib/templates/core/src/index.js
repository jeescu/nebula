import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import helmet from 'helmet';

// initializes database connection
import DB from '../database';

import routes from './routes';
import config from '../config';

const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(config.apiPrefix, routes);

app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`
    Port: ${config.port}
    Env: ${app.get('env')}
  `);
});

export default app;
