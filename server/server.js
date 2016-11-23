const io = require('socket.io')();
const fetch = require('isomorphic-fetch');

io.of('/general').on('connection', (socket) => {

  socket.on('message', (message) => {
    message.time = Date.now()
    socket.broadcast.emit('user:message', message);
    socket.emit('user:message', message);
    console.log('message', message);
  });

});

io.listen(3001);
