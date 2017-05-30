import React, { Component } from 'react';
// import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import LoginScreen from '../LoginScreen/LoginScreen';
import ChatScreen from '../ChatScreen/ChatScreen';
import './App.css';

class App extends Component {

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
