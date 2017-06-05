// @flow
'use strict';

import fs from 'fs';
import path from 'path';

import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import * as jwt from 'jsonwebtoken';
const app = express();
// $FlowFixMe
const http = require('http').Server(app);
const rfs = require('rotating-file-stream');
const io = require('socket.io')(http);
const xssFilters = require('xss-filters');

import {isUserInDb, addUser, validateUser} from './database';

//Reference the directory where we log all HTTP requests
const logDirectory = path.join(__dirname, 'log');

//Make sure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

//Create a rotating file write stream
const accessLogStream = rfs('access.log', {
	interval: '1d',
	path: logDirectory
});

//Set up body parsing and logging for Express
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('combined', {stream: accessLogStream}));

//Setting up API endpoints
const apiRoutes = express.Router();
apiRoutes.get('/', (req, res) => {
    res.json({ message: 'Yo' });
});

//Authentication endpoint
apiRoutes.post('/login', (req, res) => {
	

	let creds = req.body;
    
    //connect to the database and see if the user exists
    isUserInDb(creds.username)
        .then(result => {
            
            if (result) {
            	//user exists, validate credentials
                validateUser(creds)
                    .then(result => {
                        
                        //if password is valid, send a token
                        if (result) {
                            let token = jwt.sign({ user: req.body.username }, '4455566', { expiresIn: '2h' });
                            
                            return res.json({
                                success: true,
                                token: token
                            });
                        }
                        else {
                        	//Password is invalid, return false to Redux
                        	return res.json({
                        		success: false
                        	});
                        }
                    }).catch(err =>{
                    	console.log('Error validating user', err);
                    });
            }

            //user is not in the database
            else {

            }
        }).catch(err => {
            console.log('Error checking for name', err);
        });






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

io.on('connection', function(socket) {
    socket.on('chat message', function(msg) {
        io.emit('chat message', xssFilters.inHTMLData(msg));
    });
});

app.use('/api', apiRoutes);

http.listen(3005);
