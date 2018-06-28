import BaseController from './baseController';
import User from './../models/userModel';

import Constants from '../../config';
import _ from 'lodash';

class AuthController extends BaseController {

    login = (req, res) => {

        let params = this.getParams(req);
        let email = params.email || '';
        let password = params.password || '';

        User.
            query()
            .where('email', email)
            .limit(1)
            // .eager('[userRoles.role]')
            .then((resultSet) => {

                let userObj;
                if (resultSet.length === 1 && resultSet[0].password === password) {
                    userObj = resultSet[0]; 
                } else {
                    return res.status(401).json(
                        this.formatResponse(
                            true, 
                            'Invalid user data. Please check your credentials.'
                        )
                    );
                }

                let data = {};
                data.token = userObj.generateToken();

                let roles = _.reduce(userObj.userRoles, (result, value, key) => {
                    console.log(result, value, key);
                    if (value.status === Constants._strings.STATUS.ACTIVE) {
                        result.push(value.role);
                    }
                    return result;
                }, []);
                console.log(roles);

                let filteredData = this.filterParams(
                    userObj, 
                    ['password', 'userRoles']
                );

                filteredData.roles = roles;

                res.status(200).json(
                    this.formatResponse(
                        false, 
                        'Login successful.', 
                        _.merge(data, _.toPlainObject(filteredData))
                    )
                );

            })
            .catch((err) => {
                console.log(err);
                let resultObj = this.formatResponse(true, 'Invalid user data.');
                res.status(400).json(resultObj); 
            });

    }

}

export default new AuthController();