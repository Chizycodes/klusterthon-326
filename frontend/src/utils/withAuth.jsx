'use client';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useUser } from '@/context/context-provider';
import { usePathname } from 'next/navigation';

export default function withAuth(Component) {
	return function WithAuth(props) {
		const { state } = useUser();
		const pathname = usePathname();
		const [isLoading, setIsLoading] = useState(true);

		useEffect(() => {
			if (state.isAuth !== null) {
				if (state.isAuth === false) {
					redirect('/login');
				}
			}
			console.log(state.isAuth);
		}, [state.isAuth]);

		if (state.isAuth === false) {
			return null;
		}

		return (
			<>
				{state.isAuth === null ? (
					<div className="w-screen h-screen flex items-center justify-center gap-3">
						<h1 className="text-xl">DiagnoSync AI</h1>
						<span className="loading loading-bars loading-lg"></span>
					</div>
				) : (
					<Component {...props} />
				)}
			</>
		);
	};
}
