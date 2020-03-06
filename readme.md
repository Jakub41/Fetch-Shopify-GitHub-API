# Some of the good practices followed in this project:

- Async/Await support
- WinstonJs Logger Implementation
- Error Handling
- Jwt implementation
- Enviroment variables to hold configuration values .env file
- OOP (object oriented programming)



1) localhost:3000/get-all-repository-info

method: GET

Response :
```
{
"status": "SUCCESS",
"data": [
{
"repoName": "007",
"repoUrl": "https://github.com/Shopify/007"
},
{
"repoName": "activerecord-databasevalidations",
"repoUrl": "https://github.com/Shopify/activerecord-databasevalidations"
}
...
]
}
```

2) localhost:3000/get-programming-language

method: GET

Response : 200
```
{
"status": "SUCCESS",
"data": [
{
"repository": "007",
"languages": {
"Go": 22154,
"HTML": 5376,
"Ruby": 2115,
"Shell": 1977,
"JavaScript": 484,
"CSS": 95
}
},
{
"repository": "activerecord-databasevalidations",
"languages": {
"Ruby": 33876
}
}
]
}
```

3) localhost:3000/get-all-repository-details

method: GET

Response: 200
```
{
"status": true,
"message": "Success",
"data": [
{
"repository": "007",
"author": "vfeere",
"commit_date": "2018-07-09T20:16:25Z"
},
{
"repository": "007",
"author": "cttttt",
"commit_date": "2018-07-09T19:41:42Z"
}
]
}
```

4) localhost:3000/get-specific-repo-details (jwt token must be passed)

method: GET

Response: 200
```
{
"status": "SUCCESS",
"data": [
[
{
"repository": "node-themekit",
"author": "tauthomas01",
"commit_date": "2019-12-18T15:10:03Z"
},
{
"repository": "node-themekit",
"author": "chrisberthe",
"commit_date": "2019-12-18T14:55:40Z"
}
]
}
```

5) localhost:3000/login (Token get JWT token )

method: POST
Parameters: {
"email": "XXXX@gmail.com",
"password": "XXXXXXX"
}

Response: 200
```
{
{
"token":
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImVtYWlsIjoia2tAZ21haWwuY29tIiwicGFzc3dvcmQiOiJhc2RmZ2hqa2wifSwiaWF0IjoxNTgzNDIyNDMzLCJleHAiOjE1ODM1MDg4MzN9.cywD6Gjx3hAhTOHclJo1gZiiN_o3Jmb_Q69EcyfzyKI",
"refreshToken":
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImVtYWlsIjoia2tAZ21haWwuY29tIiwicGFzc3dvcmQiOiJhc2RmZ2hqa2wifSwiaWF0IjoxNTgzNDIyNDMzLCJleHAiOjE1ODM1OTUyMzN9.eaISmkWYlVdAPWOWQqtLei70GtIFK-TIC6c4j68MNvc",
"message": "Success"
}
}
```