const express = require('express');
const SocketServer = require('ws').Server;
const PORT = 8080;
const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));
const wss = new SocketServer({ server });


wss.broadcast = (data) => {
  wss.clients.forEach((client) => {
    client.send(data);
  });
};


wss.on('connection', (socket) => {
  console.log('Client connected');
  console.log('Number of clients connected: ' + wss.clients.length);

  var client_count = wss.clients.length;
  client_counter = {
    type: 'client_count',
    count: client_count
  }
  wss.broadcast(JSON.stringify(client_counter));


  socket.on('message', (data) => {
    var d_a_t_a = JSON.parse(data);
    newMessage = {};
    console.log('message received ', d_a_t_a.type);

    if (d_a_t_a.type === 'postMessage') {
      newMessage = {
        type: 'incomingMessage',
        key: d_a_t_a.key,
        user_name: d_a_t_a.user_name,
        content: d_a_t_a.content
      };
    } else if (d_a_t_a.type === "postNofication") {
      newMessage = {
        type: 'incomingNotification',
        key: d_a_t_a.key,
        user_name: d_a_t_a.user_name,
        content: d_a_t_a.content
      };
    } else {
      console.log('well fudge');
    }

    wss.broadcast(JSON.stringify(newMessage));
  })

  socket.on('close', () => console.log('Client disconnected'));
});