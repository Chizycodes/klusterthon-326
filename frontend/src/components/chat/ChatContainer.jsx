'use client';
import React, { useEffect, useRef, useState } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { useUser } from '@/context/context-provider';
import { toast } from 'react-toastify';
import StartSession from './StartSession';
import { useParams } from 'next/navigation';
import { getSession, getSessions } from '@/utils/api';
import Axios from '@/utils/axiosInterceptor';

const ChatContainer = () => {
	const { state, setCurrentSession } = useUser();
	const chatContainerRef = useRef(null);
	const { id } = useParams();
	const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(false);
	const [lastSession, setLastSession] = useState({});

	const scrollToBottom = () => {
		if (chatContainerRef.current) {
			chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
		}
	};

	const handleSendMessage = async (message) => {
		const data = { content: message, role: 'user' };
		setMessages((prevMessages) => [...prevMessages, data]);

		try {
			setLoading(true);
			const response = await Axios.patch(`/session/${lastSession?._id}/chat`, data);
			setMessages((prevMessages) => [...prevMessages, response?.data?.data]);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			const err = error?.response?.data?.error;
			toast.error(err ?? 'An error occured');
		}
	};

	const getSessionMessages = async (id) => {
		const response = await getSession(state.token, setCurrentSession, id);

		setMessages(response?.chats || []);
		setLastSession(response || {});
	};

	useEffect(() => {
		if (id) {
			getSessionMessages(id);
		} else {
			setLastSession(state?.chatSessions[0]);
			setMessages(state.chatSessions[0]?.chats || []);
		}
	}, [state?.chatSessions, id]);

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	return (
		<div className="mx-auto p-4 w-full h-[90vh] flex">
			{state.chatSessions?.length ? (
				<div className="w-full flex flex-col justify-end">
					<div
						className="overflow-y-auto pb-5 scrollbarNone"
						style={{ scrollBehavior: 'smooth' }}
						ref={chatContainerRef}
					>
						<div className="">
							{messages?.map((msg, index) => (
								<ChatMessage key={index} message={msg.content} isUser={msg.role === 'user'} />
							))}
						</div>
					</div>
					{loading && <span className="loading loading-dots loading-md mt-3"></span>}
					<ChatInput onSendMessage={handleSendMessage} loading={loading} />
				</div>
			) : (
				<StartSession />
			)}
		</div>
	);
};

export default ChatContainer;
