const jwt = require('jsonwebtoken');
const _ = require('lodash');
import {
    default as config
} from '../config/config';
const Logger = require('./logger');

const logger = new Logger();

// Function to pull token from header
function getTokenFromHeader(req) {
    if ((req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') ||
        (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')) {
        return req.headers.authorization.split(' ')[1];
    }

    return null;
}

// Verify JWT token
function verifyToken(req, res, next) {
    try {
        if (_.isUndefined(req.headers.authorization)) {
            res.status(401).json({
                status: 'Unauthorized',
                message: 'Not Authorized to access this resource!'
            });
        }
        const Bearer = req.headers.authorization.split(' ')[0];

        if (!Bearer || Bearer !== 'Bearer') {
            res.status(401).json({
                status: 'Unauthorized',
                message: 'Not Authorized to access this resource!'
            });
        }

        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            logger.log(`jwt verification failed at : ${new Date()} Unauthorized`, 'error');
            res.status(401).json({
                status: 'Unauthorized',
                message: 'Not Authorized to access this resource!'
            });
        }

        // verifies secret and checks exp
        jwt.verify(token, config.auth.jwt_secret, (err, decoded) => {
            if (err) {
                logger.log(`jwt verification failed at : ${new Date()} error is ${err}`, 'error');
                res.status(401).json({
                    status: 'Unauthorized',
                    message: 'Please provide a valid token ,your token might be expired'
                });
            }
            req.decoded = decoded;
            logger.log(`jwt verified at : ${new Date()} from : ${decoded}`, 'info');
            next();
        });
    } catch (err) {
        logger.log(`Unhandled error : ${err}`, 'error');
        res.status(500).json({
            type: 'error',
            message: err.message || err.message || 'Unhandled Error'
        });
    }
}


module.exports = {
    getJwtToken: getTokenFromHeader,
    isAuthunticated: verifyToken
};