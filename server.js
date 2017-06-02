// @flow

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const xssFilters = require('xss-filters');

const fs = require('fs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

const apiRoutes = express.Router();

apiRoutes.get('/', (req, res) => {
    res.json({ message: 'Yo' });
});

//Authentication endpoint
apiRoutes.post('/authenticate', (req, res) => {
    //connect to the database
    fs.readFile('mockusers.json', 'utf8', (err, data) => {
        //if can't connect to DB, throw an error
        if (err) {
            return res.json({
                success: false
            });
        } else {
            let users = JSON.parse(data).users;
            //check if the user exists
            for (let i = 0; i < users.length; i++) {
                if (req.body.name === users[i].username) {
                    //if user exists, check if password is valid
                    if (req.body.pass === users[i].password) {
                        //if password is valid, send a token
                        let token = jwt.sign({ user: req.body.name }, '4455566', { expiresIn: '2h' });
                        return res.cookie('auth-token', 'test').json({
                            success: true,
                            token: token
                        });
                    }
                    //if password is invalid, return an error
                    else {
                        return res.json({
                            sucess: false
                        });
                    }
                }
                //if user doesn't exist, send an error
                else {
                    return res.json({
                        success: false
                    });
                }
            }
        }
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

//Testing, remove before production
apiRoutes.get('/secret', (req, res) => {
	return res.json({success: 'you got in'});
});

io.on('connection', function(socket) {
    socket.on('chat message', function(msg) {
        io.emit('chat message', xssFilters.inHTMLData(msg));
    });
});

app.use('/api', apiRoutes);

http.listen(3005);
