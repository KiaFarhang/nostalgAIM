// @flow

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const xssFilters = require('xss-filters');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(morgan('dev'));

const apiRoutes = express.Router();

apiRoutes.get('/', (req, res) => {
	res.json({message: 'Yo'});
});

io.on('connection', function(socket){
	socket.on('chat message', function(msg){
		io.emit('chat message', xssFilters.inHTMLData(msg));
	});
});

app.use('/api', apiRoutes);

http.listen(3005);