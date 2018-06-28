import { Model } from 'objection';
import BaseModel from './baseModel';
import _ from 'lodash';
import path from 'path'

import config from '../../config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class User extends BaseModel {

    static get tableName() {
        return 'user';
    }

    static get jsonSchema() {
        const properties = {
            username: {type: 'string'},
            email: {type: 'string', format: 'email'},
            password: {type: 'string'}
        }
        
        return {
            type: 'object',
            required: ['username', 'email', 'password'],
            properties: _.assign(properties, super.commonProperties)
        };
    }

    /**
     * Relationships
     */

    // static get relationMappings() {
    //     return {
    //         userRoles: {
    //             relation: Model.HasManyRelation,
    //             modelClass: path.join(__dirname, 'userRole.model'),
    //                 join: {
    //                 from: 'user.id',
    //                 to: 'user_role.user_id'
    //             }

    //         }
    //     };
    // }

    /**
     * Hooks
     */    

    $beforeInsert(queryContext) {
        super.$beforeInsert(queryContext);
        
        this.password = User.hashPassword(this.password);
    }

    $beforeUpdate(opt, queryContext) {
        super.$beforeUpdate(opt, queryContext);

        // @TODO: hash the password if this is changed
        console.log("I've overriden the parent");
    }

    
    /**
     * Class-specific properties
     */
    
    static get queryWhitelist() {
        return [
            'id', 
            'username', 
            'email', 
            'created_at', 
            'updated_at'
        ];
    }

    static get upsertBlackList() {
        return [ 'created_at', 'updated_at' ] 
    }

    static hashPassword(password, saltRounds = config.security.saltRounds) {
        return bcrypt.hashSync(password, saltRounds);
    }

    fullName() {
        return this.username + " - " + this.password;
    }

    authenticate(password) {
        return bcrypt.compareSync(password, this.password);
    }

    generateToken(additionalProps) {
        let data = _.merge({ _id: this.id }, additionalProps);
        return jwt.sign(_.toPlainObject(data), config.security.sessionSecret, {
            expiresIn: config.security.sessionExpiration,
        });
    }

}

export default User;