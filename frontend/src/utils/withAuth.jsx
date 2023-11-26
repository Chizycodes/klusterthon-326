'use client';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useUser } from '@/context/context-provider';

export default function withAuth(Component) {
	return function WithAuth(props) {
		const { state } = useUser();

		useEffect(() => {
			if (state.isAuth !== null) {
				if (state.isAuth === false) {
					redirect('/login');
				}
			}
		}, [state.isAuth]);

		if (!state.isAuth) {
			return (
				<div className="w-screen h-screen flex items-center justify-center gap-3">
					<h1 className="text-xl">DiagnoSync AI</h1>
					<span className="loading loading-bars loading-lg"></span>
				</div>
			);
		}

		return (
			<>
				<Component {...props} />
			</>
		);
	};
}
