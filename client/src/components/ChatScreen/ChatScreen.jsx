//ChatScreen holds all the websocket logic to emit and display
//messages to and from the server. It stores the current messages
//in state, which it passes down to a child MessageArea component.

//ChatScreen
  //MessageArea
  	//Messages
  //ChatBar
    //TextArea
    //Button

import React, { Component } from 'react';
import MessageArea from '../MessageArea/MessageArea';
import ChatBar from '../ChatBar/ChatBar';

const io = require('socket.io-client'); 
const socket = io();  

class ChatScreen extends Component{
	constructor(props){
		super(props);
		this.postMessage = this.postMessage.bind(this);

		this.state = {messages: []};
	}

	componentDidMount(){
		let th = this;
		socket.on('chat message', function(msg){
			let messageArray = th.state.messages;
			messageArray.push(msg);
			th.setState({messages: messageArray});
		});
	}

	postMessage(msg){
		socket.emit('chat message', msg);
	}

	render(){
		return(
			<div className="ChatScreen">
				<MessageArea messages={this.state.messages}/>
				<ChatBar onMessageInput={this.postMessage}/>
			</div>
		);
	}

}


export default ChatScreen;