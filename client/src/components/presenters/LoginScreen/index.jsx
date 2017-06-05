// @flow

//The login screen is where users log in to enter the
//rest of the application.

import React, { Component } from 'react';
// const xssFilters = require('xss-filters');

class LoginScreen extends Component {
	props: {
		logInUser: Function
	};

	handleSubmit = (event: Event) => {
		event.preventDefault();
		const username = this.refs.username.value;
		const password = this.refs.password.value;
		const creds = `username=${username}&password=${password}`;
		this.props.logInUser(creds);
	}

	render(){
		return(
			<form onSubmit={this.handleSubmit}>
				<label>User:
					<input type='text' ref='username'/>
				</label>
				<label>Password:
					<input type='password' ref='password'/>
				</label>
				<input type='submit' value='Log In' />
			</form>
		)
	}
}

export default LoginScreen;