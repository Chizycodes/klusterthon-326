'use client';
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
		<form onSubmit={handleSendMessage} className="flex items-center mt-5 input-main p-0">
			<textarea
				rows={1}
				type="text"
				placeholder="Message DiagnoSync AI..."
				value={inputMessage}
				onChange={handleInputChange}
				className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary border-r-0 border-l-0 "
			/>
			<button
				type="submit"
				className="px-4 py-2 bg-primary disabled:opacity-70 disabled:bg-primary text-white rounded-md"
				disabled={loading}
			>
				Send
			</button>
		</form>
	);
};

export default ChatInput;
