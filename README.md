# Room Booking System
A room booking system built with MongoDB, Express, Node.js and ReactJS.

![Logo](docs/logo.png)

[Presentation](http://slides.com/juliaryan/room-booking-system/fullscreen)
## Table of Contents

* [Getting started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [About project](#about-project)
  * [Problem](#problem)
  * [Solution](#solution)
* [Planning](#planning)
  * [Audience](#audience)
  * [User stories](#user-stories)
  * [Entity Relationship Diagram](#entity-relationship-diagram)
    * [Version One](#version-one)
    * [Version Two](#version-two)
  * [Trello](#trello)
* [Design](#design)
  * [Wireframes](#wireframes)
  * [Prototype](#prototype)
* [Development](#development)
  * [Requirements](#requirements)
  * [Technologies](#technologies)
* [Challenges and final thoughts](#challenges-and-final-thoughts)
* [Team](#team)

## Getting started
These instructions will get you a copy of the project up and running on your local machine for development purposes.
### Prerequisites
#### Back-end:
- MongoDB
- Express
- Node.js

```json
  "dependencies": {
    "body-parser": "^1.18.2",
    "cors": "^2.8.4",
    "express": "^4.16.2",
    "jsonwebtoken": "^8.1.0",
    "moment": "^2.20.1",
    "moment-timezone": "^0.5.14",
    "mongoose": "^4.13.9",
    "passport": "^0.4.0",
    "passport-google-oauth20": "^1.0.0",
    "passport-jwt": "^3.0.1",
    "passport-local": "^1.0.0",
    "passport-local-mongoose": "^4.4.0"
  },
  "devDependencies": {
    "dotenv": "^4.0.0",
    "eslint": "^4.15.0",
    "eslint-config-prettier": "^2.9.0",
    "eslint-config-standard": "^11.0.0-beta.0",
    "eslint-plugin-import": "^2.8.0",
    "eslint-plugin-node": "^5.2.1",
    "eslint-plugin-prettier": "^2.4.0",
    "eslint-plugin-promise": "^3.6.0",
    "eslint-plugin-standard": "^3.0.1",
    "nodemon": "^1.14.10",
    "now": "^9.2.7",
    "prettier": "^1.10.2"
  }
```
#### Front-end:
- React.js
```json
  "dependencies": {
    "axios": "^0.17.1",
    "jwt-decode": "^2.2.0",
    "moment": "^2.20.1",
    "moment-timezone": "^0.5.14",
    "normalize.css": "^7.0.0",
    "query-string": "^5.0.1",
    "react": "^16.2.0",
    "react-datetime": "^2.11.1",
    "react-dom": "^16.2.0",
    "react-modal": "^3.1.11",
    "react-router-dom": "^4.2.2",
    "react-scripts": "1.0.17"
  },
    "devDependencies": {
    "autoprefixer-stylus": "^0.14.0",
    "concurrently": "^3.5.1",
    "stylus": "^0.54.5"
  }
```
### Installation
Clone the repo
```
git clone https://github.com/Adamkaram/booking-system
```

Change to the `api` folder and install development and production dependencies.

```
cd api
yarn install
```

Change to the `web` folder and install development and producation dependencies.
```
cd web
yarn install
```

You will need to set up MongoDB. See [MongoDB](https://docs.mongodb.com/) for instructions.

Seed the data
```
yarn seed
```

For Google OAuth you will need to register an application with Google. See [passport-google-oauth2](https://github.com/jaredhanson/passport-google-oauth2) for further instructions.

Go to the `api` folder and start the server.
```
cd api
yarn dev
```

Go to the `web` folder and run the script start script.
```
cd api
yarn start
```

Open in your browser and navigate to http://localhost:3000. You access the back-end on http://localhost:7000.

