# Store-Manager


### Build Status

[![Build Status](https://travis-ci.com/mecsoccer/Store-Manager.svg?branch=develop)](https://travis-ci.com/mecsoccer/Store-Manager)
[![Coverage Status](https://coveralls.io/repos/github/mecsoccer/Store-Manager/badge.svg?branch=develop)](https://coveralls.io/github/mecsoccer/Store-Manager?branch=develop)


## Introduction

Store Manager is a web application that helps store owners manage sales and product inventory records.


## Table of Contents

* [Link to hosted API backend](#Link-to-hosted-api-backend)
* [Link to UI Templates](#link-to-ui-templates)
* [Technologies Used](#technologies-used)
* [Testing Tools](#testing-tools)
* [Application Features](#application-features)
* [API Documentation](#api-documentation)
* [How to Run](#how-to-run)
* [How to Test](#how-to-test)
* [Author](#author)
* [License](#license) 


## Link to Hosted API backend

* [API link](https://stark-crag-43885.herokuapp.com/api/v1)


## Link to UI Templates

* UI [templates](https://mecsoccer.github.io/Store-Manager/) are hosted on github pages


## Technologies Used

* [Nodejs](https://nodejs.org/en/)
* [Es6](https://es6.io/)
* [Express](https://expressjs.com)
* [JWT](https://www.npmjs.com/package/jsonwebtoken)
* [Babel](https://babeljs.io)
* [Eslint](https://eslint.org) (Airbnb--style guide)


## Testing Tools

* [Mocha](https://mochajs.org) - A javascript test framework
* [Chai](https://www.chaijs.com) - Assertion library
* [nyc](https://www.npmjs.com/package/nyc) - A reporting tool


## Application Features

* Admin can add a product
* Admin can update a product
* Admin can delete a product
* Admin can add a store attendant
* Admin can update a store attendant/give admin privilege
* Admin can delete a store attendant
* Admin/store attendant can get all products
* Admin/store attendant can get a specific product
* Admin/store attendant can search a specific product
* Store attendant can add sale orders
* Store/Admin attendant can add product to a category
* Admin can get all sale order records
* Store attendant can view owned records
* Store Attendant/Admin can view owned single sales records
* Admin can add a category
* Admin can update a category
* Admin can delete a category
* Admin/store attendant can get all categories
* Admin/store attendant can get a specific category
* Admin/store attendant can login
* Store attendant can get personal detail


## API Documentation
Available shortly


## How to Run

```
# Clone this repository
$ git clone https://github.com/mecsoccer/Store-Manager.git

# Go into the repository
$ cd Store-Manager

# Install dependencies
$ npm install

# Create .env file for environment variables in your root directory and paste the following
PORT=3000

note: you are free to use any port

# Run the app
$ npm start

your app should now be running at http://localhost:3000/api/v1.
```


## How to Test

```
# Clone this repository
$ git clone https://github.com/mecsoccer/Store-Manager.git

# Go into the repository
$ cd Store-Manager

# Install dependencies
$ npm install

# run test
$ npm run test
```


## Author
Jaachimma Onyenze


## License
MIT
