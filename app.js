var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

var score = 0, message, runs, over = 1, count = 1;
var messageArr = ['Good Shot','Missed to field','Classic Text Book Shot','Hat trick','Classical Sot','Unbelievable miss','Very good catch by mid-on player'];

//Whenever someone connects this gets executed
io.on('connection', function(socket){
  console.log('A user connected');

  setInterval(function(){
    if(count%7 == 0) {
      over++;
    }

    /*Generate Random runs b/n 0-7 */
    runs = Math.floor(Math.random() * 7);
    score = score + runs;

    if(runs == 4 || runs == 6){
      message = messageArr[Math.floor(Math.random() * messageArr.length)];
    }else{
      message = '';
    }

    io.sockets.emit('broadcast',{ runs:runs, score: score, message: message, over: over});
    count++;

  }, 10000);

  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
    console.log('A user disconnected');
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
