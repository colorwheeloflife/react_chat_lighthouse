import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import ClientCount from './ClientCount.jsx';
const uuid = require('uuid');
const socket = new WebSocket("ws://localhost:8080");



const App = React.createClass({

  getInitialState: function() {
     return {
      type: "",
      currentUser: {name: 'Anonymous'},
      messages: [],
    };
  },

  componentDidMount: function() {

    socket.onmessage = ({data}) => {
      var parsed = JSON.parse(data);
      switch(parsed.type) {
        case "incomingMessage":
        case "incomingNotification":
          var messageLog = this.state.messages;
          messageLog.push(parsed);
          var thisUserName = {name: parsed.user_name};
          this.setState({messages: messageLog});
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
    if(name != this.state.currentUser.name) {
      var content = this.state.currentUser.name + " changed their name to " + name;
      this.state.currentUser.name = name;
      this.addNotification(content);
    }
    socket.send(JSON.stringify(data));
  },

  addNotification: (notification) => {
    var notify = {
      type: 'postNofication',
      content: notification
    };
    console.log('sending post notification to server');
    socket.send(JSON.stringify(notify));
  },

  onNameChanged(name) {
    this.setState({
      currentUser: {
        name
      }
    })
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
          />
          <ChatBar
          currentUser={this.state.currentUser}
          sendMessage={this.addMessage}
          onNameChanged={this.state.currentUser} />
        </div>
      </div>
    );
  }
});



export default App;