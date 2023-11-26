import React, { useState } from 'react';

const ChatInput = ({ onSendMessage, loading }) => {
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
		<div className="flex items-center mt-5">
			<textarea
				rows={1}
				type="text"
				placeholder="Message DiagnoSync AI..."
				value={inputMessage}
				onChange={handleInputChange}
				className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
			/>
			<button
				onClick={handleSendMessage}
				className="ml-2 px-4 py-2 bg-primary disabled:opacity-5 text-white rounded-md"
				disabled={loading}
			>
				Send
			</button>
		</div>
	);
};

export default ChatInput;
