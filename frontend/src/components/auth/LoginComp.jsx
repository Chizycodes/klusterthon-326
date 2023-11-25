'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
	email: yup.string().email('Invalid email').required('Email is required'),
	password: yup.string().required('Password is required'),
});

const LoginComp = () => {
	const [loading, setLoading] = useState(false);
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
			const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, data, {
				headers: {
					'Content-Type': 'application/json',
				},
			});
			setLoading(false);
			typeof window !== 'undefined' && window.localStorage.setItem('authToken', response?.data?.token);
		} catch (error) {
			setLoading(false);
			const err = error?.response?.data?.error;
			toast.error(err ?? 'An error occured');
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<label htmlFor="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
						Email Address
					</label>
					<input
						type="email"
						name="email"
						id="email"
						placeholder="example@example.com"
						className={`input-main ${errors.email ? 'border-red-500' : ''}`}
						{...register('email')}
					/>
					{errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
				</div>

				<div className="mt-6">
					<div className="flex justify-between mb-2">
						<label htmlFor="password" className="text-sm text-gray-600 dark:text-gray-200">
							Password
						</label>
						<a href="#" className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline">
							Forgot password?
						</a>
					</div>

					<input
						type="password"
						name="password"
						id="password"
						placeholder="Your Password"
						className={`input-main ${errors.password ? 'border-red-500' : ''}`}
						{...register('password')}
					/>
					{errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
				</div>

				<div className="mt-6">
					<button type="submit" className="button-main" disabled={loading}>
						Sign in {loading && <span className="loading loading-spinner loading-md"></span>}
					</button>
				</div>
			</form>

			<p className="mt-6 text-sm text-center text-gray-400">
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
