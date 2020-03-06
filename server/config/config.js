'use strict';

require('dotenv').config();

var config = {
	url: {
		base: 'https://api.github.com'
	},
	github: {
		token: process.env.GITHUB_TOKEN //'918a660f7a1095e4be02d4c7e37077a6e6fb49fd',
	},
	auth: {
		jwt_secret: process.env.JWT_SECRET, //'hfyghkhtFtfjbcDrbFNlY3JldA==',
		jwt_expiresin: process.env.JWT_EXPIRES_IN || '1d',
		saltRounds: process.env.SALT_ROUND || 10,
		refresh_token_secret: process.env.REFRESH_TOKEN_SECRET || 'VmVyeVBvd2VyZnVsbFNlY3JldA==',
		refresh_token_expiresin: process.env.REFRESH_TOKEN_EXPIRES_IN || '2d', // 2 days
	},
}

export default config;