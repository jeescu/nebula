import MessageFormatter from '../utils/messageFormatter';
import jwt from 'jsonwebtoken';

import User from '../models/userModel';

import Constants from '../../config';
const { sessionSecret } = Constants.security;

export default function auth(req, res, next) {
    const { authorization } = req.headers;
    jwt.verify(authorization, sessionSecret, (err, decoded) => {
        
        if (err) {
            let msg = MessageFormatter.formatMessage(true, "Invalid session data.", {});
            return res.status(401).json(msg);
        }

        // If token is decoded successfully, find user and attach to our request
        // for use in our route or other middleware
        User.query()
            .findById(decoded._id)
            .then((user) => {
                if (!user) {
                    let msg = MessageFormatter.formatMessage(true, "Invalid session data.", {});
                    return res.status(401).json(msg);
                }

                req.user = user;
                next();
            })
            .catch((err) => next(err));
    });
}
