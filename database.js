// @flow
'use strict';

let pg = require('pg');
let fs = require('fs');

require('dotenv').config();

let pgConfig = {
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    max: 10,
    idleTimoutMillis: 30000
};

let pool = new pg.Pool(pgConfig);

//Checks if the user is in the database.
exports.isUserInDb = function isUserInDb(username) {
    return new Promise((resolve, reject) => {
        //connect to the database
        pool.connect(function(error, client, done) {
            if (error) {
                return reject(error);
            }
            //SELECT for the username
            client.query(`SELECT 1 FROM users WHERE username = '${username}'`, (error, result) => {
                //disconnect
                done();
                if (error) {
                    return reject(error);
                }
                //if result contains a row, return true (user exists)
                if (result.rowCount === 1) {
                    return resolve(true);
                }
                //otherwise, return false (user doesn't exist)
                return resolve(false);
            });
        });
    })
}

//Adds a user to the database.
exports.addUser = function addUser(user) {
    return new Promise((resolve, reject) => {
        //connect to the database
        pool.connect(function(error, client, done) {
            if (error) {
                return reject(error);
            }
            //INSERT the user's name and password
            client.query(`INSERT INTO USERS (username, password) VALUES('${user.username}', crypt('${user.password}', gen_salt('bf', 5)))`, (error, result) => {
                //disconnect
                done();
                if (error) {
                    return reject(error);
                }
                return resolve(true);
            });
        });
    });
}

exports.validateUser = function validateUser(user) {
    return new Promise((resolve, reject) => {
        //connect to the database
        pool.connect(function(error, client, done) {
            if (error) {
                return reject(error);
            }
            //SELECT for the user with supplied password
            client.query(`SELECT 1 FROM users WHERE username = '${user.username}' AND password = crypt('${user.password}', password)`, (error, result) => {
                //disconnect
                done();
                if (error) {
                    return reject(error);
                }
                //if result contains a row, return true (user exists)
                if (result.rowCount === 1) {
                    return resolve(true);
                }
                //otherwise, return false (user doesn't exist)
                return resolve(false);
            });
        });
    });
}
 

