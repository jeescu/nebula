import { Router } from 'express';

import auth from './middleware/authenticate';

import IndexController from './controllers/indexController';
import AuthController from './controllers/auth.controller';
import FacetController from './controllers/facetController';

const routes = new Router();
routes.get('/', IndexController.index);

/**
 * Authentication 
 */
routes.post('/auth', AuthController.login);

/**
 * Resources
 */
routes.get('/facet/browse', auth, FacetController.browse);

export default routes;
