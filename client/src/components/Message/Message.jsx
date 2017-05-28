//The Message component displays a single chat message.
//It inherits the message body from its parent MessageArea component

import React, { Component } from 'react';

class Message extends Component {
	render(){
		return(
			<div className="Message">
				<p>{this.props.body}</p>
			</div>
		)
	}
}

export default Message;