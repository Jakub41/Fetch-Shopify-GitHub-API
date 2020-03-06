'use strict';

import express from 'express';
import RepositoryInfo from '../controller/getRepoDetails';
import Language from '../controller/language';
import AuthController from '../controller/login';
import auth from '../utils/auth';

const router = express.Router();

router.post('/login', AuthController.login)

router.get('/get-all-repository-info', RepositoryInfo.getRecentRepository);

router.get('/get-programming-language', Language.getProgrammingLanguage)

router.get('/get-all-repository-details', RepositoryInfo.getRepositoryDetails)
 
router.get('/get-specific-repo-details', auth.isAuthunticated, RepositoryInfo.getSpecificRepository)

export default router;
