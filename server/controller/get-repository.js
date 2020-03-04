import fetch from 'node-fetch';
import { default as config } from "../config/config";
import { getCommitInfo } from '../helpers/iterator';


class Repository {

    constructor(url, repoArr, urlArr) {
        this.sub_url = url;
        this.repoArr = repoArr;
        this.urlArr = urlArr;
    }
    

    static getRepositoryDetails(repoArr, sub_url) {
        return new Promise(async (resolve, reject) => {
            try {
                let repoDetails = await Promise.all(repoArr.map(async url => {

                    let req_url = `${config.baseUrl}${sub_url}${url.name}/commits`;

                    const response = await fetch(req_url, {
                        headers: {
                            authorization: `token ${config.token}`
                        }
                    });
                    let json = await response.json();
                    let formattedJson = await json.map(obj => ({
                        ...obj,
                        repository: url.name
                    }))
                    let resp = await getCommitInfo(formattedJson);

                    return resp;
                }))

                let flatArray = await [].concat.apply([], repoDetails);

                resolve({
                    status: true,
                    message: 'Success',
                    data: flatArray
                })

            } catch (e) {
                console.log(e);
                reject({
                    status: false,
                    message: 'failed',
                    error: e
                })
            }
        })
    }

    static getProgrammingLanguage(urlArr) {
        return new Promise(async (resolve, reject) => {
            try {
                let langList = await Promise.all(urlArr.map(async url => {
                    const response = await fetch(url.languages_url, {
                        headers: {
                            authorization: `token ${config.token}`
                        }
                    });
                    const json = await response.json();

                    return {
                        repository: await url.name,
                        languages: await json
                    };
                }));

                resolve({
                    status: true,
                    message: 'Success',
                    data: langList
                });

            } catch (error) {
                console.log(error);
                reject({
                    status: false,
                    message: 'failed',
                    error: error
                })
            }
        })
    }

    static getAllRepositories(sub_url) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(config.baseUrl + sub_url, {
                    headers: {
                        authorization: `token ${config.token}`
                    }
                });
                const json = await response.json();

                resolve({
                    status: true,
                    message: 'Success',
                    data: json
                });
            } catch (e) {
                console.log(e);
                reject({
                    status: false,
                    message: 'failed',
                    error: e
                })
            }
        })
    }
}

export default Repository;