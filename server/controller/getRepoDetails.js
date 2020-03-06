'use strict';

import fetch from 'node-fetch';
import {
    default as config
} from "../config/config";
import Repository from './getAllRepos'
import Logger from '../utils/logger';
import Iterator from '../helpers/iterator';

const logger = new Logger();

class RepositoryInfo {

    // RepositoryInfo API Middlewares

    constructor() {
        
    }

    // Static Methods to get detailed information about repositories
    static async getRepositoryDetails(req, res) {
        try {

            let repoArr = await Repository.getAllRepositories('/users/Shopify/repos?per_page=100');
            let sub_url = '/repos/Shopify/';
            let repoDetails = await Promise.all(repoArr.data.map(async url => {

                let req_url = `${config.url.base}${sub_url}${url.name}/commits`;

                const response = await fetch(req_url, {
                    headers: {
                        authorization: `token ${config.github.token}`
                    }
                });
                let json = await response.json();
                logger.log(`fetched data at : ${new Date()} from : ${req_url}`, 'info');
                let formattedJson = await json.map(obj => ({
                    ...obj,
                    repository: url.name
                }))
                let resp = await Iterator.getCommitInfo(formattedJson);

                return resp;
            }))

            let flatArray = await [].concat.apply([], repoDetails);

            res.status(200).json({
                status: true,
                message: 'Success',
                data: flatArray
            })

        } catch (error) {
            logger.log(`got error at : ${new Date()} in class function getRepositoryDetails error :  ${error}`, 'error');
            res.status(400).json({
                status: 'FAILED',
                error: error
            })
        }
    }

    // Static methods to get names and URLs of the 50 most recent repositories in Shopify's repository list
    static async getRecentRepository(req, res) {
        try {
            let repoList = await Repository.getAllRepositories('/users/Shopify/repos?per_page=50');
            if (repoList.status) {
                let reposData = await repoList.data.map(repo => {
                    return {
                        repoName: repo.name,
                        repoUrl: repo.svn_url
                    }
                })

                res.status(200).json({
                    status: 'SUCCESS',
                    data: reposData
                })
            } else {
                res.status(400).json({
                    status: 'FAILED',
                    data: []
                })
            }
        } catch (error) {
            res.status(400).json({
                status: 'FAILED',
                error: error
            })
        }
    }

    // Static Methods to get detailed information for some specific repository
    static async getSpecificRepository(req, res) {
        try {
            let sub_url = '/repos/Shopify/';

            let repoArr = [{
                    name: 'node-themekit',
                    repoUrl: 'https://github.com/Shopify/node-themekit'
                }, {
                    name: 'shopify_api',
                    repoUrl: 'https://github.com/Shopify/shopify_api'
                },
                {
                    name: 'eslint-plugin-shopify',
                    repoUrl: 'https://github.com/Shopify/eslint-plugin-shopify'
                }
            ];

            let repoDetails = await Promise.all(repoArr.map(async url => {

                let req_url = `${config.url.base}${sub_url}${url.name}/commits`;

                const response = await fetch(req_url, {
                    headers: {
                        authorization: `token ${config.github.token}`
                    }
                });

                // response from github
                let json = await response.json();
                logger.log(`fetched data at : ${new Date()} from : ${req_url}`, 'info');

                // Adding repository name to each response data
                let formattedJson = await json.map(obj => ({
                    ...obj,
                    repository: url.name
                }))

                let resp = await Iterator.getCommitInfo(formattedJson);

                return resp;
            }))

            res.status(200).json({
                status: 'SUCCESS',
                data: repoDetails
            })

        } catch (error) {
            logger.log(`error occured at : ${new Date()} error is : ${error}`, 'error');
            res.status(400).json({
                status: 'FAILED',
                error: error
            })
        }
    }

}

export default RepositoryInfo;