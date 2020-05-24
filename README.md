# My Weather App
## Description
A simple weather app using basic authentication and admin user that serves weather for Sofia but can also display weather for a city of choice.

_This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)._

_Safari seems to cause some problems. Please use Chrome or Firefox or any other alternative._
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Deployment
### Pre-requisites
1. Make sure that all koa server middleware and packages are installed using the following command `npm install koa koa-router koa-bodyparser koa-cors koa-static koa-mount uuid axios`

### Steps
0. Get all packages for the react project using `npm install`
1. Go to the react root folder and run `npm run build` to build the optmizied bundle for production.
2. Move the build folder to the backend root `mv build backend/`
3. Run the backend server using `node backend.js`
   * By default the server listens on port 3001. Can be changed using environment variable PORT set to a port of your choice.
4. Navigate to `localhost:3001` and login with the administrator password.
