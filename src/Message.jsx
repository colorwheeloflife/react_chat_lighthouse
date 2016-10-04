import React from 'react';
import App from './App.jsx';
import MessageList from './MessageList.jsx';

const Message = React.createClass({
  render() {
    console.log("Rendering <Message/>");
    return(
      <div className="message">
        <span className="user_name">{this.props.user_name}</span>
        <span className="content">{this.props.content}</span>
      </div>
    );
  }
});

export default Message;






<div class="message system">
  Anonymous1 changed their name to nomnom.
</div>
