import React, { useState } from 'react';

const ChatInput = ({ onSendMessage }) => {
	const [inputMessage, setInputMessage] = useState('');

	const handleInputChange = (e) => {
		setInputMessage(e.target.value);
	};

	const handleSendMessage = () => {
		if (inputMessage.trim() !== '') {
			onSendMessage(inputMessage);
			setInputMessage('');
		}
	};

	return (
		<div className="flex items-center">
			<input
				type="text"
				placeholder="Type your message..."
				value={inputMessage}
				onChange={handleInputChange}
				className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
			/>
			<button onClick={handleSendMessage} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md">
				Send
			</button>
		</div>
	);
};

export default ChatInput;
