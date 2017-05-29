import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import LoginScreen from '../LoginScreen/LoginScreen';
import ChatScreen from '../ChatScreen/ChatScreen';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {loggedIn: false};
    this.requireAuth = this.requireAuth.bind(this);
  }

  componentDidMount(){
    if (localStorage.getItem('nostalgAIM_username') !== undefined) {
      this.setState({loggedIn: true});
    }
    
  }

  requireAuth(nextState, replace){
    if (this.state.loggedIn === true) {
      replace({
        pathname: '/chat'
      });
    }
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path='/' render={() => (
            this.state.loggedIn ? (
              <Redirect to='/chat'/>
            ) : (
              <LoginScreen/>
            )
          )}/>  
          <Route path='/chat' component={ChatScreen}/>
        </div>
      </Router>
    );
  }
}

export default App;
