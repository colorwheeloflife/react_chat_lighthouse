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


  getInitialState() {
    return {loading: data};
  },

  render: function() {
    return (
      <div>
        <MessageList
        messages = {this.state.loading.messages} />
        <ChatBar
        username = {this.state.loading.currentUser.name} />
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