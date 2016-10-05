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

  handleChange(event) {
    if (event.keyCode == 13) {
      var username = this.refs.username.value;
      var message = this.state.value;
      this.props.sendMessage(username, message);
    }
  },

  handleNameChange() {
    this.setState({currentUser: event.target.value});
  },

  handleInput(event) {
    this.setState({value: event.target.value});
  },



  render() {
    console.log("Rendering <ChatBar/>");
    return(
      <footer>
        <input
          id="username"
          type="text"
          ref="username"
          onChange={this.handleNameChange}
          value= {this.props.username} />
        <input
          id="new-message"
          type="text"
          placeholder="Type a message and hit ENTER"
          onChange={this.handleInput}
          onKeyDown={this.handleChange}
          />
      </footer>
    );
  }
});



export default ChatBar;


