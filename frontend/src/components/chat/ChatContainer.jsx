import React, { useEffect, useState } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { useUser } from '@/context/context-provider';
import { toast } from 'react-toastify';
import axios from 'axios';

const ChatContainer = () => {
	const { state } = useUser();
	const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(false);
	const [lastSession, setLastSession] = useState({});
	const sessionId = lastSession?._id;

	const handleSendMessage = async (message) => {
		const data = { content: message, role: 'user' };
		setMessages((prevMessages) => [...prevMessages, data]);

		try {
			setLoading(true);
			const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/session/${sessionId}/chat`, data, {
				headers: {
					'Content-Type': 'application/json',
					authorization: `Bearer ${state?.token}`,
				},
			});
			setMessages((prevMessages) => [...prevMessages, response?.data?.data]);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			const err = error?.response?.data?.error;
			toast.error(err ?? 'An error occured');
		}
	};

	useEffect(() => {
		setLastSession(state?.chatSessions[0]);
		setMessages(state.chatSessions[0]?.chats);
	}, [state?.chatSessions]);

	return (
		<div className="mx-auto p-4 w-full h-[90vh] flex">
			<div className="w-full flex flex-col justify-end">
				<div className="overflow-y-auto pb-5">
					<div className="">
						{messages?.map((msg, index) => (
							<ChatMessage key={index} message={msg.content} isUser={msg.role === 'user'} />
						))}
					</div>
				</div>
				{loading && <span className="loading loading-dots loading-md mt-3"></span>}
				<ChatInput onSendMessage={handleSendMessage} loading={loading} />
			</div>
		</div>
	);
};

export default ChatContainer;
