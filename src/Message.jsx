import React from 'react';
import App from './App.jsx';
import MessageList from './MessageList.jsx';


const Message = React.createClass({
  render() {
    return(
      <section>
        <div className="message">
          <span className="user_name">{this.props.user_name}</span>
          <span className="content">{this.props.content}</span>
        </div>
      </section>
    );
  }
});

export default Message;