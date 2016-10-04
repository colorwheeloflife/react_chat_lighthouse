import React from 'react';
import App from './App.jsx';
import Message from './Message.jsx';

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
    return(
      <div id="message-list">
        {this.props.messages.map((result) => (
          <Message
            key = {result.key}
            user_name = {result.username}
            content = {result.content}
            />
        ))}

      </div>
    );
  }
});




export default MessageList;