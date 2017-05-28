//The ChatBar component is where users type and send messages.

import React, { Component } from 'react';

class ChatBar extends Component{
	constructor(props){
		super(props);
		//Store the value of the message currently being typed in state.
		this.state = {value: ''};

		this.postMessage = this.postMessage.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	//This event fires every time the user types in the input box, updating the state with the current
	//contents of the box.

	handleChange(event){
		this.setState({value: event.target.value});
	}

	postMessage(event){
		event.preventDefault();
		//Fetch the message from the input box, 
		let msg = event.target.getElementsByTagName('input')[0].value;
		//Run the onMessageInput function (inherited from parent) to update parent's state.
		this.props.onMessageInput(msg);
		//Reset the state of the chat bar since the message has been sent.
		this.setState({value: ''});
	}

	render(){
		return(
			<form onSubmit={this.postMessage}>
				<input type='text' value={this.state.value} onChange={this.handleChange}/>
				<input type='submit' value='Send' />
			</form>
		);
	}
}

export default ChatBar;