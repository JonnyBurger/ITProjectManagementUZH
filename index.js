var express = require('express');
var app = express();
var http = require('http').Server(app)
var io = require('socket.io')(http);
var reader = require('./reader');

app.get('/', function (request, response) {
	response.sendFile(__dirname + '/views/index.html');
});

app.use('/static', express.static('build'));

http.listen(process.env.PORT || 9999, () => {
	console.log('listan')
});

io.on('connection', function (socket) {
	socket.on('code', $0 => {
		reader.mapTweets(
			new Function('tweet', 'emit', $0.map),
			new Function('key', 'val', 'return ' + $0.reduce),
		 	(response) => { socket.emit('message', response) }
		);
	});
});