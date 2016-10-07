import React from 'react';
import App from './App.jsx';
import Message from './Message.jsx';
var uuid = require('uuid');



const MessageList = React.createClass({

  propTypes: {
      content: React.PropTypes.string
    },

  getDefaultProps: function() {
    return {
      user_name: "Anonymous",
      content: "Words go here."
    }
  },

  render() {
    console.log("Rendering <MessageList/>");
    console.log('right heeeeere');
    console.log(this.props.notifications);
    return(
      <section>
        <div id="message-list">
          {this.props.messages.map((result) => (
            <Message
              key = {uuid.v1()}
              user_name = {result.user_name}
              content = {result.content}
              />
          ))}
          {this.props.notifications.map((result) => (
            <Message
              content = {result.content}
              />
          ))}
        </div>
      </section>
    );
  }
});



export default MessageList;