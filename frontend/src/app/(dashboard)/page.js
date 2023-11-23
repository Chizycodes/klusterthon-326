'use client';
import ChatContainer from '@/components/chat/ChatContainer';
import Image from 'next/image';

export default function Home() {
	return (
		<div className="h-[100vh] relative">
			<ChatContainer />
		</div>
	);
}
