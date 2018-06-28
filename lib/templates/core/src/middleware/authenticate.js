import MessageFormatter from '../utils/messageFormatter';
import jwt from 'jsonwebtoken';

import Constants from '../../config';
const { sessionSecret } = Constants.security;

export default function auth(req, res, next) {
    const { authorization } = req.headers;
    jwt.verify(authorization, sessionSecret, (err, decoded) => {
        
        if (err) {
            let msg = MessageFormatter.formatMessage(true, "Invalid session data.", {});
            return res.status(401).json(msg);
        }

        next();
    });
}
