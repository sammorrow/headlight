# Headlight Assessment

## Overview

This app runs an image against a sophisticated Wayne Enterprises image recognition API, delivering its results to the users. 

## Installation

This program requires [nodejs](https://nodejs.org/en/download/) and a package manager, either npm (bundled with node) or [yarn](https://yarnpkg.com/lang/en/docs/install/).

Unzip this folder, navigate to it, and run the following code:
````
npm i / yarn install
````

**NOTE:** You will need an API key to run this program. Hopefully you have one given to you by Headlight. Create a root-level file named 'secrets.js' and insert:
````
module.exports = {
  API_KEY: YOUR_KEY_HERE
}
````

When you are set up, you can build the webpack bundle with the command `yarn run build`, then fire up the server with `yarn start`.
### Dependencies

This application uses [axios](https://www.npmjs.com/package/axios) to make promise-based AJAX requests.

On the development side, this program uses [webpack](https://www.npmjs.com/package/webpack) and its suite of modules to generate a bundled Javascript file.
