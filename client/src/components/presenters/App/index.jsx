// @flow

import React, { Component } from 'react';
// import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import LoginScreen from '../LoginScreen';
import ChatScreen from '../ChatScreen/';
import './App.css';

class App extends Component {

  props: {
    isAuthenticated: boolean,
    logInUser: Function
  };

  componentDidMount(){

  }

  render(){
    return(
      <div className="App">
        {!this.props.isAuthenticated && <LoginScreen logInUser={this.props.logInUser}/>}
        {this.props.isAuthenticated && <ChatScreen/>}
      </div>
    )
  }
}

export default App;
