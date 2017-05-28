import React, { Component } from 'react';

import ChatWindow from '../ChatScreen/ChatScreen';
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
