# File Uploader Website (Backend)

This project serves as a backend server for the [File Uploader Website](https://file-uploader-frontend.herokuapp.com) to supports relevant requests.
Node.js backend project using ExpressJS and MongoDB.

Hosted on and deployed on Heroku: [https://file-uploader-backend.herokuapp.com/](https://file-uploader-backend.herokuapp.com/)

## Prerequisites

Minimally, you should have node installed on your computer along with a terminal to execute the commands.
A text editor will be ideal for opening up the files to edit and view the codes.
MongoDB installation is not required unless you wish to run on your local PC. Please follow the instructions [here](https://docs.mongodb.com/manual/installation/).

## Configurations

The backend is connected to a MongoDB, hosted on Atlas. If you wish to run the database locally, go to `src/models/index.js` to modify the `url` variable from `CLOUD_URL` to `LOCAL_URL`.

## Specification

All the requests less `signIn` and `signUp` requires a valid JSON Web Token (JWT) in the header for security purposes.

### Authentication Endpoints

#### /api/auth/signin

This endpoint is an example of users authentication. It takes user credentials and responds with a unique JWT.

```
POST https://localhost:5000/api/auth/signin HTTP/1.1
Content-type: application/json;
{
    "email": "string",
    "password": "string"
}

Response:
{
    "accessToken": "string"
}
```

#### /api/auth/user

This endpoint checks whether the request is authenticated by an access token header. It takes the user's accessToken and finds and returns related user information (id, email, name).

```
GET http://localhost:5000/api/auth/user HTTP/1.1
Content-type: application/json;
x-access-token: <accessToken>

Response:
{
    "id": "string",
    "email": "string",
    "name": "string"
}
```

#### /api/auth/signup

This endpoint takes in the user's new credentials, performs encryption on the password and then save to the database after validating there are no duplicate records. Respond with a message to indicate success or failure.

```
POST http://localhost:5000/api/auth/signup HTTP/1.1
Content-type: application/json;
{
    "email": "string",
    "password": "string",
    "name": "string"
}

Response:
{
    "message": "string"
}
```

### Files Endpoints

#### /upload

This endpoint allows user to upload files. It takes in a file and responds with a message to indicate success or failure.

```
POST http://localhost:5000/upload HTTP/1.1
Content-type: multipart/form-data;
x-access-token: <accessToken>
{
    "file": "file",
}

Response:
{
    "message": "string"
}
```

#### /files

This endpoint returns the user's uploaded files by retrieving the user's ID via the header token.

```
GET http://localhost:5000/files HTTP/1.1
Content-type: application/json;
x-access-token: <accessToken>

Response:
{
    "files": []
}
```

#### /files/:name

This endpoint generates and returns the user's selected file download URL by taking in the file name as the parameter.

```
GET http://localhost:5000/files/<name> HTTP/1.1
Content-type: application/json;
x-access-token: <accessToken>

Response:
{
    "url": "string"
}
```

#### /files/:name

This endpoint deletes the file via file name passed in by the parameter. Returns a boolean to indicate success or failure.

```
DELETE http://localhost:5000/files/<name> HTTP/1.1
Content-type: application/json;
x-access-token: <accessToken>

Response:
{
    "success": "boolean"
}
```

## Build Setup

```bash
# install dependencies
$ npm install

# serve locally at localhost:5000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start
```
