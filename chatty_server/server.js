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

  var clients = [];
  var clientsOnline = clients.length;

  socket.on('message', (data) => {
    var d_a_t_a = JSON.parse(data);

    clients.push(d_a_t_a);

    newMessage = {};

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

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  socket.on('close', () => console.log('Client disconnected'));

});