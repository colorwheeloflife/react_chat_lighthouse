import React from 'react';
import App from './App.jsx';

const ChatBar = React.createClass({

  propTypes: {
      username: React.PropTypes.string
    },

  getDefaultProps: function() {
    return {
      username: "Your Name (Optional)",
      newmessage: "Type a message and hit ENTER"
    }
  },

  render() {
    console.log("Rendering <ChatBar/>");
    return(
      <footer>
        <input id="username" type="text" placeholder= {this.props.username} />
        <input id="new-message" type="text" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
});



export default ChatBar;


