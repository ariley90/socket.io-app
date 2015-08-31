var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.get('/client', function (req, res){
    res.sendfile('client.html');
})

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('data', function(data){
    var firstMessage = true;
    var phoneHeight;
    if (firstMessage){
        phoneHeight = 0;
        firstMessage = false;
    }
    phoneHeight += data.acceleration.y;
    io.emit('data',{
        // x: data.accelerationIncludingGravity.x,
        y: data.acceleration.y,
        phoneHeight: phoneHeight
        // z: data.accelerationIncludingGravity.z,
    });
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});