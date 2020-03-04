export const getCommitInfo = async (arr) => {
    return new Promise(async (resolve, reject) => {
        try {
            let commitDetails = await Promise.all(arr.map(async (value) => {
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
            resolve(flatArray);

        } catch (e) {
            console.log(e)
        }
    })
}

export const filterDataBasedOnDate = async (arr) => {
    return new Promise(async (resolve, reject) => {
        try {
            let flatArray = await [].concat.apply([], arr);
            let commitDetails = await Promise.all(flatArray.filter(async (value) => {
                var com_date = new Date(value.commit_date)
                var year = com_date.getFullYear();
                return year >= 2017;
            }))
            resolve(commitDetails)
        } catch (e) {
            console.log(e)
        }
    })
}