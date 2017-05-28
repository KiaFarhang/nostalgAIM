const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const xssFilters = require('xss-filters');


io.on('connection', function(socket){
	socket.on('chat message', function(msg){
		io.emit('chat message', xssFilters.inHTMLData(msg));
	});
});

http.listen(3005);