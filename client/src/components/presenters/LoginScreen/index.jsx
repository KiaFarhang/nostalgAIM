// @flow

//The login screen is where users log in to enter the
//rest of the application.

import React, { Component } from 'react';
// const xssFilters = require('xss-filters');

class LoginScreen extends Component {
	props: {
		toggleLogin: Function
	};

	constructor(props: Object){
		super(props);

		(this:any).toggleLogin = this.toggleLogin.bind(this);
	}

	toggleLogin(event: Event){
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
				<label>Password:
					<input type='password'/>
				</label>
				<input type='submit' value='Log In' />
			</form>
		)
	}
}

export default LoginScreen;