import React, {Component} from 'react';

const io = require('socket.io-client'); 
const socket = io();  

class ChatWindow extends Component {
	constructor(props){
		super(props);

		this.state = {
			data: []
		};
	}

	componentDidMount(){
		let th = this;



		socket.emit('chat message', 'hi');
		console.log('test');

	}

	render(){
		return(
			<div>
				<h1>Work?</h1>
			</div>
		)
	}
}

export default ChatWindow;