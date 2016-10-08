import React from 'react';
import App from './App.jsx';


const ClientCount = React.createClass({
  render() {
      return(
      <div className="wrapper">
        <nav>
          <h1>Chatty</h1>
          <h4>Users Online: {this.props.client_count}</h4>
        </nav>
      </div>
      )
  }
});



export default ClientCount;