import React from 'react';
import Link from 'next/link';

const Login = () => {
	return (
		<>
			<form>
				<div>
					<label htmlFor="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
						Email Address
					</label>
					<input
						type="email"
						name="email"
						id="email"
						placeholder="example@example.com"
						className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
					/>
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
						className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
					/>
				</div>

				<div className="mt-6">
					<button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-primary rounded-lg hover:bg-primary focus:outline-none focus:bg-primary focus:ring focus:ring-primary focus:ring-opacity-50">
						Sign in
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

export default Login;
