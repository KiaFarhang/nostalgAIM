//The ChatBar component is where users type and send messages.

import React, { Component } from 'react';

class ChatBar extends Component{
	constructor(props){
		super(props);
		this.state = {value: ''};

		this.postMessage = this.postMessage.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event){
		this.setState({value: event.target.value});
	}

	postMessage(event){
		event.preventDefault();
		this.props.onMessageInput(e.target.value);
		this.setState({value: ''});
	}

	render(){
		return(
			<form onSubmit={this.postMessage}>
				<textarea value={this.state.value} onChange={this.handleChange}/>
				<input type='submit' value='Send' />
			</form>
		);
	}
}

export default ChatBar;