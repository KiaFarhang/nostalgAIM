//The login screen is where users log in to enter the
//rest of the application.

import React, { Component } from 'react';
const xssFilters = require('xss-filters');

class LoginScreen extends Component {
	constructor(props){
		super(props);

		this.login = this.login.bind(this);
	}

	//This event logs the user in once they submit their credentials.
	login(event){
		event.preventDefault();
		//Get the username from the form.
		let username = event.target.getElementsByClassName('input')[0];
		//Store the username in localStorage.
		localStorage.setItem('nostalgAIM_username', xssFilters.inHTMLData(username));
	}
	render(){
		return(
			<form onSubmit={this.login}>
				<label>User:
					<input type='text'/>
				</label>
				<input type='submit' value='Log In' />
			</form>
		)
	}
}

export default LoginScreen;