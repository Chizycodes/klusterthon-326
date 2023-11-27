'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useUser } from '@/context/context-provider';
import Axios from '@/utils/axiosInterceptor';

const schema = yup.object().shape({
	email: yup.string().email('Invalid email').required('Email is required'),
	password: yup.string().required('Password is required'),
});

const LoginComp = () => {
	const [loading, setLoading] = useState(false);
	const { setToken } = useUser();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data) => {
		try {
			setLoading(true);
			const response = await Axios.post(`/auth/login`, data);
			const token = response?.data?.token;

			setToken({ isAuth: true, token });
			typeof window !== 'undefined' && localStorage.setItem('authToken', token);
			toast.success('Login successful');
			setLoading(false);
		} catch (error) {
			setLoading(false);
			const err = error?.response?.data?.error;
			toast.error(err);
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					{/* <label htmlFor="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
						Email Address
					</label> */}
					<input
						type="email"
						name="email"
						id="email"
						placeholder="Email Address"
						className={`input-main ${errors.email ? 'border-red-500' : ''}`}
						{...register('email')}
					/>
					{errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
				</div>

				<div className="mt-4">
					<div className="flex justify-end mb-2">
						{/* <label htmlFor="password" className="text-sm text-gray-600 dark:text-gray-200">
							Password
						</label> */}
					</div>

					<input
						type="password"
						name="password"
						id="password"
						placeholder="Password"
						className={`input-main ${errors.password ? 'border-red-500' : ''}`}
						{...register('password')}
					/>
					{errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
				</div>
				<Link href="#" className="text-sm text-gray-500 focus:text-primary hover:text-blue-500 hover:underline">
					Forgot password?
				</Link>

				<div className="mt-6">
					<button type="submit" className="button-main" disabled={loading}>
						Sign in {loading && <span className="loading loading-spinner loading-md"></span>}
					</button>
				</div>
			</form>

			<p className="mt-6 text-sm text-center text-gray-500">
				Don't have an account yet?{' '}
				<Link href="/signup" className="text-primary focus:outline-none focus:underline hover:underline">
					Sign up
				</Link>
				.
			</p>
		</>
	);
};

export default LoginComp;
