import Image from 'next/image';
import React from 'react';

const ChatMessage = ({ message, isUser }) => {
	return (
		<div className={`chat  ${isUser ? 'chat-end' : 'chat-start'}`}>
			<div className="chat-image avatar">
				<div className="w-10 rounded-full">
					<Image
						className=""
						width={100}
						height={100}
						src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&h=634&q=80"
						alt="avatar"
					/>
				</div>
			</div>
			<div className="chat-header">{isUser ? 'You' : 'AI Doc'}</div>
			<div className="chat-bubble">{message}</div>
		</div>
	);
};

export default ChatMessage;
