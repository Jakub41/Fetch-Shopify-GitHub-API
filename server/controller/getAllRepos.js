'use strict';

import fetch from 'node-fetch';
import {
    default as config
} from "../config/config";
import Logger from '../utils/logger';

// Instance of logger class
const logger = new Logger();


class Repository {

    // Repository API Middlewares

    constructor() {
        this.sub_url = '/repos/Shopify/';
    }

    // Static Methods to get all repositories from Shopify
    static async getAllRepositories(sub_url) {
        try {
            
            const response = await fetch(config.url.base + sub_url, {
                headers: {
                    authorization: `token ${config.github.token}`
                }
            });
            const json = await response.json();
            logger.log(`fetched data at : ${new Date()} from : ${config.url.base + sub_url} with the following results ${json}`, 'info');
            return ({
                status: true,
                message: 'Success',
                data: json
            });
        } catch (error) {
            logger.log(`got error at : ${new Date()} while calling : ${config.url.base + sub_url} error :  ${error}`, 'error');
            return ({
                status: false,
                message: 'failed',
                error: error
            })
        }
    }
}

export default Repository;