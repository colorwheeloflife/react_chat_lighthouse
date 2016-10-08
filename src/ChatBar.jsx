import React from 'react';
import App from './App.jsx';


const ChatBar = React.createClass({

  getInitialState: function() {
    return {
      message: "",
      username: "Anonymous"
    };
  },

  handleChange(event) {
    if (event.keyCode == 13) {
      var username = this.state.username;
      var messages = this.state.value;
      this.props.sendMessage(username, messages);
      this.setState({message: ""});
    }
  },

  handleNameChange(event) {
    this.setState({username: event.target.value});
  },

  handleInput(event) {
    this.setState({value: event.target.value});
  },

  render() {
    return(
      <footer>
        <input
          id="username"
          type="text"
          onChange={this.handleNameChange}
          value= {this.props.username}
          placeholder="Your Name (Optional)"/>
        <input
          id="new-message"
          type="text"
          placeholder="Type a message and hit ENTER"
          onChange={this.handleInput}
          onKeyDown={this.handleChange}
          value={this.state.messages}
          />
      </footer>
    );
  }
});



export default ChatBar;