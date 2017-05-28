import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import ChatScreen from '../ChatScreen/ChatScreen';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ChatScreen />
      </div>
    );
  }
}

export default App;
