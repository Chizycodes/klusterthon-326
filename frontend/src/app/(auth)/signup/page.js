import React from 'react';
import Link from 'next/link';

const SignUp = () => {
	return (
		<>
			<form>
				<div>
					<label htmlFor="firstName" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
						First Name
					</label>
					<input type="text" name="firstName" id="firstName" placeholder="First Name" className="input-main" />
				</div>

				<div className="mt-4">
					<label htmlFor="lastName" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
						Last Name
					</label>
					<input type="text" name="lastName" id="lastName" placeholder="Last Name" className="input-main" />
				</div>

				<div className="mt-4">
					<label htmlFor="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
						Email Address
					</label>
					<input type="email" name="email" id="email" placeholder="example@example.com" className="input-main" />
				</div>

				<div className="mt-4">
					<div className="flex justify-between mb-2">
						<label htmlFor="password" className="text-sm text-gray-600 dark:text-gray-200">
							Password
						</label>
					</div>

					<input type="password" name="password" id="password" placeholder="Your Password" className="input-main" />
				</div>

				<div className="mt-4">
					<button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-primary rounded-lg hover:bg-primary focus:outline-none focus:bg-primary focus:ring focus:ring-primary focus:ring-opacity-50">
						Sign up
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

export default SignUp;
