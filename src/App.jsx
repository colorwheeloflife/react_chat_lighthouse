import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import ClientCount from './ClientCount.jsx';
const uuid = require('uuid');
const socket = new WebSocket("ws://localhost:8080");



const App = React.createClass({

  getInitialState: function() {
    var currentUser = {};
    var messages = [];
    var notifications = [];
    var client_count = "";
    return {currentUser: currentUser, messages: messages, notifications: notifications, client_count: client_count};
  },

  componentDidMount: function() {
    socket.onmessage = ({data}) => {
      var parsed = JSON.parse(data);

      switch(parsed.type) {
        case "incomingMessage":
          var newMessages = this.state.messages;
          newMessages.push(parsed);
          this.setState({messages: newMessages});
          var nowUser = newMessages[newMessages.length - 1].user_name;
          var lastUser = newMessages[newMessages.length - 2].user_name;
          if(nowUser != lastUser) {
            var content = lastUser + " changed their name to " + nowUser;
            this.addNofication(content);
          }
          break;
        case "incomingNotification":
          var newNotification = this.state.notifications;
          newNotification.push(parsed);
          this.setState({notifications: newNotification});
          break;
        case "client_count":
          var client_counter = this.state.client_counter;
          client_counter = parsed.count;
          this.setState({client_count: client_counter});
          break;
        default:
          throw new Error("Unknown event type " + data.type);
      }
    }
  },

  addMessage: function(name, message) {
    var data = {
      type: 'postMessage',
      key: uuid.v1(),
      user_name: name,
      content: message
    };
    socket.send(JSON.stringify(data));
  },

  addNofication: (notification) => {
    var notify = {
      type: 'postNofication',
      content: notification
    };
    console.log('sending post notification to server');
    socket.send(JSON.stringify(notify));
  },

  render: function() {
    return (
      <div>
        <div>
          <ClientCount
            client_count={this.state.client_count}
          />
        </div>
        <div>
          <MessageList
          messages={this.state.messages}
          notifications={this.state.notifications}/>
          <ChatBar
          currentUser={this.state.currentUser.name}
          messages={this.state.messages}
          sendMessage={this.addMessage} />
        </div>
      </div>
    );
  }

});



export default App;