'use client';
import { usePathname } from 'next/navigation';

export default function AuthLayout({ children }) {
	const pathname = usePathname();
	const isLogin = pathname === '/auth/login';
	return (
		<div className="bg-white dark:bg-gray-900">
			<div className="flex justify-center h-screen">
				<div
					className="hidden bg-cover lg:block lg:w-2/3"
					style={{
						backgroundImage:
							'url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)',
					}}
				>
					<div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
						<div>
							<h2 className="text-2xl font-bold text-white sm:text-3xl">DiagnoSync AI</h2>

							<p className="max-w-xl mt-3 text-gray-300">
								Empowering Health Decisions: Instant Symptom Analysis and Guidance. Your AI-Driven Companion for Quick
								and Informed Healthcare Choices.
							</p>
						</div>
					</div>
				</div>

				<div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
					<div className="flex-1">
						<div className="text-center">
							<div className="flex justify-center mx-auto">
								<img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt="" />
							</div>

							<p className="mt-3 text-gray-500 dark:text-gray-300">
								Sign {isLogin ? 'in' : 'up'} to access your account
							</p>
						</div>

						<div className="mt-8">{children}</div>
					</div>
				</div>
			</div>
		</div>
	);
}
