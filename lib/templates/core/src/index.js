import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import errorHandler from 'errorhandler';
import helmet from 'helmet';

import DB from '../database';

import routes from './routes';
import Constants from '../config';

const app = express();

// Helmet helps you secure your Express apps by setting various HTTP headers
// https://github.com/helmetjs/helmet
app.use(helmet());

// Enable CORS with various options
// https://github.com/expressjs/cors
app.use(cors());

// Parse incoming request bodies
// https://github.com/expressjs/body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Lets you use HTTP verbs such as PUT or DELETE
// https://github.com/expressjs/method-override
app.use(methodOverride());

// Mount API routes
app.use(Constants.apiPrefix, routes);

// Send stack traces in development
// https://github.com/expressjs/errorhandler
// @TODO: make an elegant solution!
if (Constants.envs.development) {
  // app.use(errorHandler());
  app.use(function (err, req, res, next) {
    console.log(err);
    let errorJson = {
      "isError":true,
      "messages":[
        {
          "message":"Something broke! Our developers have been notified and will look into this.",
          "type":"",
          "path":"",
          "value":null
        }
      ],
      "data":null
    }

    let httpStatus = 500;

    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      errorJson.messages[0].message = "Bad JSON passed to request.";
      httpStatus = 400;
    }
    
    res.status(httpStatus).json(errorJson)
  });
} else {
  app.use(function (err, req, res, next) {
    console.log(err);
    let errorJson = {
      "isError":true,
      "messages":[
        {
          "message":"Something broke! Our developers have been notified and will look into this.",
          "type":"",
          "path":"",
          "value":null
        }
      ],
      "data":null
    }

    let httpStatus = 500;

    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      errorJson.messages[0].message = "Bad JSON passed to request.";
      httpStatus = 400;
    }
    
    res.status(httpStatus).json(errorJson)
  });
}

app.listen(Constants.port, () => {
  // eslint-disable-next-line no-console
  console.log(`
    Port: ${Constants.port}
    Env: ${app.get('env')}
  `);
});

export default app;
