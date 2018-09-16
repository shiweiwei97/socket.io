var app = require('express')();
var server = require('http').createServer(app);
var io = require('../..')(server);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/worker.js', function(req, res){
  res.sendFile(__dirname + '/worker.js');
});

io.on('connection', function(socket){
  console.log('a user connected');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.broadcast.emit('hi');

  socket.on('disconnect', function(){
    console.log('user disconnected');
    socket.broadcast.emit('good bye');
  });

  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});
