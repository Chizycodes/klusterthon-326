'use client';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { useUser } from '@/context/context-provider';
import { usePathname } from 'next/navigation';

export default function withAuth(Component) {
	return function WithAuth(props) {
		const { state } = useUser();
		const pathname = usePathname();

		useEffect(() => {
			if (pathname === '/login') {
				if (state.isAuth) {
					redirect('/');
				}
			} else {
				if (!state.isAuth) {
					redirect('/login');
				}
			}
		}, []);

		return <Component {...props} />;
	};
}
