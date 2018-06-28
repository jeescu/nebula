import { Model } from 'objection';
import _ from 'lodash';

class BaseModel extends Model {

    // @TODO: create a local object of old values

    static get commonProperties() {
        return {
            id: {type: 'integer'},
            createdAt: {type: 'string', format: 'date-time'},
            updatedAt: {type: 'string', format: 'date-time'},
        }
    }
    
    /**
     * Hooks
     */

    $beforeInsert(queryContext) {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    $beforeUpdate(opt, queryContext) {
        this.updatedAt = new Date();
    }

    // This is called when an object is serialized to database format.
    $formatDatabaseJson = (json) => {
        
        // Call superclass implementation.
        json = Model.prototype.$formatDatabaseJson.call(this, json);

        return _.mapKeys(json, function (value, key) {
            return _.snakeCase(key);
        });
    }

    // This is called when an object is read from database.
    $parseDatabaseJson(json) {
        
        json = _.mapKeys(json, function (value, key) {
            return _.camelCase(key);
        });

        // Call superclass implementation.
        return Model.prototype.$parseDatabaseJson.call(this, json);
    }
}

export default BaseModel;