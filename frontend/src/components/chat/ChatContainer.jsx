import React, { useEffect, useState } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

const ChatContainer = () => {
	const [messages, setMessages] = useState([]);

	const handleSendMessage = (message) => {
		setMessages((prevMessages) => [...prevMessages, { text: message, isUser: true }]);

		// Simulate AI response (replace this with actual AI logic)
		setTimeout(() => {
			setMessages((prevMessages) => [...prevMessages, { text: 'AI Response...', isUser: false }]);
		}, 500);
	};

	useEffect(() => {
		console.log(messages);
	}, [messages]);

	return (
		<div className="mx-auto p-4 w-full h-full flex">
			<div className="w-full flex flex-col justify-end">
				<div className='overflow-y-auto'>
					{messages.map((msg, index) => (
						<ChatMessage key={index} message={msg.text} isUser={msg.isUser} />
					))}
				</div>

				<ChatInput onSendMessage={handleSendMessage} />
			</div>
		</div>
	);
};

export default ChatContainer;
