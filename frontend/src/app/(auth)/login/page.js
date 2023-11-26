'use client';
import LoginComp from '@/components/auth/LoginComp';
import { useUser } from '@/context/context-provider';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

const Login = () => {
	const { state } = useUser();
	useEffect(() => {
		if (state.isAuth) {
			redirect('/');
		}
	}, [state.isAuth]);
	return (
		<>
			<LoginComp />
		</>
	);
};

export default Login;
