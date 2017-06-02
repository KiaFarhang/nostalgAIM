// @flow

import React, { Component } from 'react';
// import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import LoginScreen from '../LoginScreen';
import ChatScreen from '../ChatScreen/';
import './App.css';

class App extends Component {

  props: {
    isLoggedIn: boolean,
    onLoginToggle: Function
  };

  componentDidMount(){

  }

  render(){
    return(
      <div className="App">
        {!this.props.isLoggedIn && <LoginScreen toggleLogin={this.props.onLoginToggle}/>}
        {this.props.isLoggedIn && <ChatScreen/>}
      </div>
    )
  }
}

export default App;
