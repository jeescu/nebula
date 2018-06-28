import { Router } from 'express';

import auth from './middleware/authenticate';

import IndexController from './controllers/indexController';
import FacetController from './controllers/facetController';

const routes = new Router();
routes.get('/', IndexController.index);

/**
 * Resources
 */
routes.get('/facet/browse', auth, FacetController.browse);

export default routes;
