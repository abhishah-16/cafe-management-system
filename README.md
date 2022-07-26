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
