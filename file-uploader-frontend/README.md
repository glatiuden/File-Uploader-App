# File Uploader Website (Frontend)

A simple website that supports uploading, retrieval and removal of files.
Developed using Nuxt.js with Vuetify.js for UI Library. Supported by backend services developed using Node.js.
[View live example](https://file-uploader-frontend.herokuapp.com/)

## Prerequisites

Minimally, you should have node installed on your computer along with a terminal to execute the commands.
A text editor will be ideal for opening up the files to edit and view the codes.

If you wish to run the backend locally, please change the env.backend_URL and axios.baseURL in the `nuxt.config.js` to `http://localhost:5000`.

## Features

-   Material Design Framework using [Vuetify.js](https://vuetifyjs.com/)
-   Authentication services using [nuxt/auth](https://auth.nuxtjs.org/)
-   Drag and drop files to upload using [nuxt-dropzone](https://github.com/Etheryte/nuxt-dropzone)
-   Retrieval, deletion and downloading of uploaded files
-   Hosted on [Heroku](https://heroku.com)

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```
