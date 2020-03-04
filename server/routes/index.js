import express from 'express';
var router = express.Router();
import Repository from '../controller/get-repository'

router.get('/get-all-repository-info', async (req, res, next) => {
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
});

router.get('/get-programming-language', async (req, res, next) => {
  let repoList = await Repository.getAllRepositories('/users/Shopify/repos?per_page=50');
  if (repoList.status) {
    let langList = await Repository.getProgrammingLanguage(repoList.data);
    if (langList.status) {
      res.status(200).json({
        status: 'SUCCESS',
        data: langList.data
      })
    } else {
      res.status(400).json({
        status: 'FAILED',
        data: []
      })
    }
  } else {
    res.status(400).json({
      status: 'FAILED',
      data: []
    })
  }
})

router.get('/get-repository-details', async (req, res, next) => {
  let repoList = await Repository.getAllRepositories('/users/Shopify/repos?per_page=100');
  if (repoList.status) {
    let repoInfo = await Repository.getRepositoryDetails(repoList.data, '/repos/Shopify/');
    if (repoInfo.status) {
      let commitDetails = await repoInfo.data.filter(async (value) => {
        var com_date = new Date(value.commit_date)
        var year = com_date.getFullYear();
        return year > 2016;
      })

      res.status(200).json({
        status: 'SUCCESS',
        data: commitDetails
      })
    } else {
      res.status(400).json({
        status: 'FAILED',
        data: []
      })
    }
  } else {
    res.status(400).json({
      status: 'FAILED',
      data: []
    })
  }
})



router.get('/get-repo-details', async (req, res, next) => {

  let reposs = [{
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

  let repoInfo = await Repository.getRepositoryDetails(reposs, '/repos/Shopify/');
  
  if (repoInfo.status) {
    res.status(200).json({
      status: 'SUCCESS',
      data: repoInfo.data
    })
  } else {
    res.status(400).json({
      status: 'FAILED',
      data: []
    })
  }

})

export default router;
