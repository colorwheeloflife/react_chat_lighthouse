import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
var uuid = require('uuid');
var socket = new WebSocket("ws://localhost:8080");



const App = React.createClass({

  getInitialState: function() {

    var currentUser = {};
    var messages = [];
    var notifications = [];
    return {currentUser: currentUser, messages: messages, notifications: notifications};
  },

  componentDidMount: function() {
    console.log("componentDidMount <App />");

    socket.onmessage = ({data}) => {
      console.log("HERE HERE");
      var parsed = JSON.parse(data);
      console.log

      switch(parsed.type) {
        case "incomingMessage":
          var newMessages = this.state.messages;
          newMessages.push(parsed);
          this.setState({messages: newMessages});
          var nowUser = newMessages[newMessages.length - 1].user_name;
          var lastUser = newMessages[newMessages.length - 2].user_name;
          if(nowUser != lastUser) {
            console.log('YIPPE');
            var content = lastUser + " changed their name to " + nowUser;
            console.log(content);
            this.addNofication(content);
          }
          break;
        case "incomingNotification":
          var newNotification = this.state.notifications;
          newNotification.push(parsed);
          var thisNotification = (newNotification[newNotification.length - 1]);
          console.log(thisNotification);
          this.setState({notifications: thisNotification});
          break;
        default:
          // show an error in the console if the message type is unknown
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
    socket.send(JSON.stringify(notify));
  },

  render: function() {
    return (
      <div>
        <MessageList
        messages={this.state.messages}
        notifications={this.state.notifications}/>
        <ChatBar
        currentUser={this.state.currentUser.name}
        sendMessage={this.addMessage} />
      </div>
    );
  }

});




export default App;


