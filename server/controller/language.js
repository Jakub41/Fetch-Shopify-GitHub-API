'use strict';

import fetch from 'node-fetch';
import {
    default as config
} from "../config/config";
import Logger from '../utils/logger';
import Repository from './getAllRepos';

const logger = new Logger();
class Language {

    // Language API Middlewares

    constructor() {
        
    }

    // Static Methods to get all programming languages in Shopify's repository list
    static async getProgrammingLanguage(req, res) {
        try {
            let repoList = await Repository.getAllRepositories('/users/Shopify/repos?per_page=50');

            let langList = await Promise.all(repoList.data.map(async url => {
                const response = await fetch(url.languages_url, {
                    headers: {
                        authorization: `token ${config.github.token}`
                    }
                });
                const json = await response.json();
                logger.log(`fetched data at : ${new Date()} from : ${url.languages_url}`, 'info');

                return {
                    repository: await url.name,
                    languages: await json
                };
            }));

            res.status(200).json({
                status: 'SUCCESS',
                data: langList
            })

        } catch (error) {
            logger.log(`error occured at : ${new Date()} from : ${error}`, 'error');
            res.status(400).json({
                status: 'FAILED',
                error: error
            })

        }
    }

}

export default Language;