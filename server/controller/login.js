const _ = require('lodash');
const jwt = require('jsonwebtoken');
const Logger = require('../utils/logger');
import {
    default as config
} from '../config/config';
const auth = require('../utils/auth');
const logger = new Logger();
const tokenList = {};

class AuthController {
    static async login(req, res) {
        try {
            const payload = {
                email: req.body.email,
                password: req.body.password
            }

            logger.log(`payload data at : ${new Date()} is : ${payload}`, 'info');

            const token = jwt.sign({
                payload
            }, config.auth.jwt_secret, {
                expiresIn: config.auth.jwt_expiresin,
                algorithm: 'HS256'
            });

            const refreshToken = jwt.sign({
                payload,
            }, config.auth.refresh_token_secret, {
                expiresIn: config.auth.refresh_token_expiresin,
            });

            const response = {
                status: 'Logged in',
                token,
                refreshToken,
            };

            tokenList[refreshToken] = response;
            res.status(200).json({
                token: token,
                refreshToken: refreshToken,
                message: 'Success'
            })

        } catch (error) {
            logger.log(`error occured at : ${new Date()} is : ${error}`, 'error');
            res.status(400).json({
                message: 'Invalid',
                error: error
            })
        }
    }



    static async refreshToken(req, res) {
        try {
            const data = req.body;
            if (_.isNull(data)) {
                res.status(400).json({
                    message: 'please provide the refresh token in request body',
                    status: 'bad request'
                })
            }

            const tokenFromHeader = auth.getJwtToken(req);
            const user = jwt.decode(tokenFromHeader);

            if ((data.refreshToken) && (data.refreshToken in tokenList)) {
                const token = jwt.sign({
                    user
                }, config.auth.jwt_secret, {
                    expiresIn: config.auth.jwt_expiresin,
                    algorithm: 'HS256'
                });

                // update the token in the list
                tokenList[data.refreshToken].token = token;
                res.status(200).json({
                    token: token,
                    message: 'A new token is issued'
                })

            } else {
                res.status(400).json({
                    message: 'no refresh token present in refresh token list',
                    status: 'bad request'
                })
            }
        } catch (err) {
            logger.log(`error occured at : ${new Date()} is : ${err}`, 'error');
            res.status(400).json({
                message: 'Invalid',
                error: err
            })
        }
    }

}
module.exports = AuthController;