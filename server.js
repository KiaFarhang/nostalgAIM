const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', function(socket){
	socket.on('chat message', function(msg){
		console.log(msg);
	});
});

http.listen(3005);