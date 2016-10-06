import React from 'react';
import App from './App.jsx';

const ChatBar = React.createClass({

  getDefaultProps: function() {
    return {
      username: "Your Name (Optional)",
      newmessage: "Type a message and hit ENTER"
    }
  },

  handleChange(event) {
    if (event.keyCode == 13) {
      var username = this.refs.username.value;
      var messages = this.state.value;
      console.log(username);
      console.log(messages);
      console.log(this.props);
      this.props.sendMessage(username, messages);

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


