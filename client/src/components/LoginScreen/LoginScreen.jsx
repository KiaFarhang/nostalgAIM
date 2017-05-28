//The login screen is where users log in to enter the
//rest of the application.

import React, { Component } from 'react';

class LoginScreen extends Component {
	constructor(props){
		super(props);

		this.login = this.login.bind(this);
	}

	login(event){
		event.preventDefault();

	}
	render(){
		return(
			<form onSubmit={this.login}>
				<input type='text' onChange={this.handleChange}/>
				<input type='submit' value='Log In' />
			</form>
		)
	}
}

export default LoginScreen;