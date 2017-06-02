// @flow

//The ChatBar component is where users type and send messages.

import React, { Component } from 'react';

class ChatBar extends Component{

	props: {
		onMessageInput: Function,
		handleChange: Function,
	};

	state = {
		value: ''
	};
	constructor(props: Object){
		super(props);
		//Store the value of the message currently being typed in state.
		// this.state = {value: ''};

		(this:any).postMessage = this.postMessage.bind(this);
		(this:any).handleChange = this.handleChange.bind(this);
	}

	//This event fires every time the user types in the input box, updating the state with the current
	//contents of the box.

	handleChange(event: Event){
		if (event.target instanceof HTMLInputElement){	
			this.setState({value: event.target.value});
		}
		else {
			console.log('error');
		}
	}

	postMessage(event: Event){
		event.preventDefault();
		//Fetch the message from the input box, 
		let msg = this.state.value;
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