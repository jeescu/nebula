import Knex from 'knex';
import { Model } from 'objection';
import Constants from '../config';

// Initialize Knex (map it to DB)
const DB = Knex(Constants.db);
Model.knex(DB);

export default DB;