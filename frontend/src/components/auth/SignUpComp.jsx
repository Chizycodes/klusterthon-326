'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { redirect } from 'next/navigation';

const schema = yup.object().shape({
	name: yup.string().required('Name is required'),
	email: yup.string().email('Invalid email').required('Email is required'),
	password: yup.string().required('Password is required'),
});

const SignUpComp = () => {
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
			const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, data, {
				headers: {
					'Content-Type': 'application/json',
				},
			});
			setLoading(false);
			toast.success('Account created successfully');
			redirect('/login');
		} catch (error) {
			const err = error?.response?.data?.error;
			toast.error(err);
			setLoading(false);
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<label htmlFor="firstName" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
						Name
					</label>
					<input
						type="text"
						name="name"
						id="name"
						placeholder="Name"
						className={`input-main ${errors.name ? 'border-red-500' : ''}`}
						{...register('name')}
					/>
					{errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
				</div>

				<div className="mt-4">
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

				<div className="mt-4">
					<div className="flex justify-between mb-2">
						<label htmlFor="password" className="text-sm text-gray-600 dark:text-gray-200">
							Password
						</label>
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

				<div className="mt-4">
					<button type="submit" className="button-main" disabled={loading}>
						Sign up {loading && <span className="loading loading-spinner loading-md"></span>}
					</button>
				</div>
			</form>
			<p className="mt-6 text-sm text-center text-gray-400">
				Already have an account?{' '}
				<Link href="/login" className="text-primary focus:outline-none focus:underline hover:underline">
					Sign in
				</Link>
				.
			</p>
		</>
	);
};

export default SignUpComp;
