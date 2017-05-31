//The login screen is where users log in to enter the
//rest of the application.

import React, { Component } from 'react';
// const xssFilters = require('xss-filters');

class LoginScreen extends Component {

	constructor(props){
		super(props);

		this.toggleLogin = this.toggleLogin.bind(this);
	}

	toggleLogin(event){
		event.preventDefault();
		//create a callable function equal to the dispatcher passed from the parent App
		let func = this.props.toggleLogin;
		//call the dispatcher
		func();
	}

	render(){
		return(
			<form onSubmit={this.toggleLogin}>
				<label>User:
					<input type='text'/>
				</label>
				<input type='submit' value='Log In' />
			</form>
		)
	}
}

export default LoginScreen;