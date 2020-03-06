'use strict';

import Logger from '../utils/logger';

const logger = new Logger();

class Iterator {
    constructor(arr) {
        this.dataArray = arr;
    }

    // Static method to extract author, commit comment date and repos name from response data
    static async getCommitInfo(dataArray) {
        try {
            let commitDetails = await Promise.all(dataArray.map(async (value) => {
                let obj = {}
                obj.repository = await value.repository;
                if (value.author) {
                    obj.author = await value.author.login;
                } else {
                    obj.author = 'not available';
                }

                if (value.commit) {
                    obj.commit_date = await value.commit.author.date;
                } else {
                    obj.commit_date = 'not available';
                }
                return obj

            }))
            let flatArray = await [].concat.apply([], commitDetails);
            return flatArray
        } catch (error) {
            return []
        }
    }

    // Static method to filter data from response data
    static async filterData(dataArray) {
        try {
            let flatArray = await [].concat.apply([], dataArray);
            let commitDetails = await Promise.all(flatArray.filter(async (value) => {
                var com_date = new Date(value.commit_date)
                var year = com_date.getFullYear();
                return year >= 2017;
            }))
            return commitDetails
        } catch (e) {
            logger.log(`error occured in iterator  at : ${new Date()} is : ${e}`, 'error');
            return []
        }
    }
}

export default Iterator;