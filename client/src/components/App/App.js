import React, { Component } from 'react';

import ChatWindow from './components/ChatWindow';
import logo from './logo.svg';
import './App.css';



//ChatScreen {}
  //MessageArea
    //props: messages
  //ChatBar
    //TextArea
    //Button



class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
          <ChatWindow/>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;