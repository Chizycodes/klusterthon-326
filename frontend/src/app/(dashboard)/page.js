'use client';
import ChatContainer from '@/components/chat/ChatContainer';
import { redirect } from 'next/navigation';
import { useUser } from '@/context/context-provider';
import { useEffect } from 'react';

export default function Home() {
	const { state } = useUser();

	useEffect(() => {
		if (state?.currentSession) {
			redirect(`/${state?.currentSession?._id}`);
		}
	}, []);
	return (
		<div className="h-[100vh] relative">
			<ChatContainer />
		</div>
	);
}
