// @flow

//The MessageArea component displays all the messages in a given thread
//as individual Message components. //It inherits the messages as props
//from the state of its parent ChatScreen component.

import React, { Component } from 'react';
import Message from '../Message';

class MessageArea extends Component {
	render(){
		const messages = this.props.messages;
		const messageComponents = messages.map(function(message, index){
			return <Message key={index} body={message} />
		});

		return(
			<div className='MessageArea'>
				{messageComponents}
			</div>
		);
	}
}

export default MessageArea;