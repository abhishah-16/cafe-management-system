# cafe-management-system
Learn how to connect PostgreSQL with NodeJs, While you are using PostgreSQL as database and NodeJs as backend, you need PostgreSQL database packages to connect with nodejs. There are various packages available but most popular and well documented is node-postgres pg. Let’s start.

What's needed
Make sure you have postgresql installed on machine and pgAdmin - postgresql management tool
Make sure you have node.js installed
Folder Structure
Within the download you'll find the following directories and files:

Connecting NodeJs & PostgreSQL
.
├──── app.js
├──── package.json
├── package-lock.json
├── .gitattributes
├── .gitignore
├── LICENSE
└── README.md
Database Connections - PostgreSQL
Create Database and use the credentials at connectionStrings.

const { Client } = require('pg');
var connectionString = "postgres://postgres:postgres@localhost:5432/database";

const client = new Client({
    connectionString: connectionString
});
Getting started
Type npm install in terminal/console in the source folder where package.json is located
Type node server.js in terminal/console in the source folder where app.js is located
server started on port 5000. (http://localhost:5000/) in default browser


#Frontend
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Deployment
https://cafe-management-system-591c9.web.app/
