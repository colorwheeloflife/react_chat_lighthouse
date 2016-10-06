import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
var uuid = require('uuid');
var socket = new WebSocket("ws://localhost:8080");



const App = React.createClass({

  getInitialState: function() {

    var currentUser = {name: "Bob"};
    var messages = [];
    return {currentUser: currentUser, messages: messages};
  },

  componentDidMount: function() {
    console.log("componentDidMount <App />");

    socket.onmessage = ({data}) => {
        console.log("HERE HERE");
        var parsed = JSON.parse(data);
        var newMessages = this.state.messages;
        newMessages.push(parsed);
        this.setState({messages: newMessages});
       }
  },

  addMessage: function(name, message) {
      var data = {
        key: uuid.v1(),
        user_name: name,
        content: message
      };
    socket.send(JSON.stringify(data));
  },

  render: function() {
    return (
      <div>
        <MessageList
        messages={this.state.messages} />
        <ChatBar
        username={this.state.currentUser.name}
        sendMessage={this.addMessage} />
      </div>
    );
  }

});




export default App;


