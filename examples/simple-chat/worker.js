importScripts('/socket.io/socket.io.js');

var socket = io();

socket.on('chat message', function(msg){
  postMessage(msg);
});

onmessage = function(message) {
  var data = message.data;
  console.log('Message received from main script: ' + data);

  socket.emit(data.type, data.message);
};


