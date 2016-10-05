import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';

var data = {
  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
    {
      key: '1a',
      username: "Bob",
      content: "Has anyone seen my marbles?",
    },
    {
      key: '2b',
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    }
  ]
};

const App = React.createClass({


  getInitialState: function() {
    function addMessage(name, message) {
      var data = {
        currentUser: {name: name},
        messages: this.state.loading.messages.concat({id: Date.now(), username: name, content: message})
      };
      this.setState({
        loading: data
      });
    }
    return {loading: data, addMessage: addMessage.bind(this)};
  },

  componentDidMount: function() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      this.state.loading.messages.push({id: 3, username: "Michelle", content: "Hello there!"});
      // Update the state of the app component. This will call render()
      this.setState({data: this.state.data})
    }, 3000);
  },

  render: function() {
    return (
      <div>
        <MessageList
        messages = {this.state.loading.messages} />
        <ChatBar
        username = {this.state.loading.currentUser.name}
        sendMessage = {this.state.addMessage} />
      </div>
    );
  }

});




export default App;





// class App extends Component {
//   render() {
//     return (
//       <h1>Hello React :)</h1>
//     );
//   }
// }




  // onSubmit() {
  //   this.setState({valueFromInput: this.theInput.value})
  // },