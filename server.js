// @flow
'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const jwt = require('jsonwebtoken');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const xssFilters = require('xss-filters');

const fs = require('fs');
const path = require('path');

//Importing rotating-file-stream and some helper functions



//Reference the directory where we log all HTTP requests
const logDirectory = path.join(__dirname, 'log');

//Make sure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

//Create a rotating file write stream
const accessLogStream = rfs('access.log', {
	interval: '1d',
	path: logDirectory
});

const database = require('./database.js');

// let userObj = {username: 'kia', password: 'Isometric'};

// database.addUser(userObj)
//     .then(function(result) {
//         console.log(result);
//     })
//     .catch(function(result) {
//         console.log(result);
//     });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('combined', {stream: accessLogStream}));

const apiRoutes = express.Router();

apiRoutes.get('/', (req, res) => {
    res.json({ message: 'Yo' });
});

let user = {username: 'kia', password: 'Isometric'};

// database.validateUser(user)
// 	.then(result =>{
// 		console.log(result);
// 	})
// 	.catch(result =>{
// 		console.log(result);
// 	}); 

//Authentication endpoint
apiRoutes.post('/login', (req, res) => {
	let creds = req.body;
    //connect to the database
    database.isUserInDb(creds.username)
        .then(result => {
            if (result) {
                database.validateUser(creds)
                    .then(result => {
                        //if password is valid, send a token
                        if (result) {
                            let token = jwt.sign({ user: req.body.username }, '4455566', { expiresIn: '2h' });
                            return res.json({
                                success: true,
                                token: token
                            });
                        }
                    }).catch(err =>{
                    	console.log('Error validating user', err);
                    });
            } else {

            }
        }).catch(err => {
            console.log('Error checking for name', err);
        });


    //if can't connect to DB, throw an error
    // if (err) {
    //     return res.json({
    //         success: false
    //     });
    // } else {
    //     let users = JSON.parse(data).users;
    //     //check if the user exists
    //     for (let i = 0; i < users.length; i++) {
    //         if (req.body.name === users[i].username) {
    //             //if user exists, check if password is valid
    //             if (req.body.pass === users[i].password) {

    //                 return res.cookie('auth-token', 'test').json({
    //                     success: true,
    //                     token: token
    //                 });
    //             }
    //             //if password is invalid, return an error
    //             else {
    //                 return res.json({
    //                     sucess: false
    //                 });
    //             }
    //         }
    //         //if user doesn't exist, send an error
    //         else {
    //             return res.json({
    //                 success: false
    //             });
    //         }
    //     }
    // }





});

//Middleware to protect certain routes behind authentication
apiRoutes.use((req, res, next) => {
    let token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, '4455566', (err, decoded) => {
            if (err) {
                return res.json({ success: false });
            } else {
                req.decoded = decoded;
                next();
            }
        })
    } else {
        return res.status(403).json({ success: false });
    }
});

//Testing, remove before production
apiRoutes.get('/secret', (req, res) => {
    return res.json({ success: 'you got in' });
});

io.on('connection', function(socket) {
    socket.on('chat message', function(msg) {
        io.emit('chat message', xssFilters.inHTMLData(msg));
    });
});

app.use('/api', apiRoutes);

http.listen(3005);
