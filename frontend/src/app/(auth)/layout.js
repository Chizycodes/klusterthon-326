'use client';
import { usePathname } from 'next/navigation';
import BG from '@/assets/images/bg3.jpg';
import { GoogleIcon } from '@/assets/svgIcons';

function AuthLayout({ children }) {
	const pathname = usePathname();
	const isLogin = pathname === '/login';
	return (
		<div className="bg-white dark:bg-gray-900">
			<div className="flex justify-center h-screen">
				<div
					className="hidden bg-cover lg:block lg:w-2/3"
					style={{
						backgroundImage: `url(${BG.src})`,
					}}
				>
					<div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-60">
						<div>
							<h2 className="text-2xl font-bold text-white sm:text-4xl">DiagnoSync AI</h2>

							<p className="max-w-xl mt-3 text-gray-300 font-medium text-lg">
								Empowering Health Decisions: Instant Symptom Analysis and Guidance. Your AI-Driven Companion for Quick
								and Informed Healthcare Choices.
							</p>
						</div>
					</div>
				</div>

				<div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
					<div className="flex-1">
						<div className="text-center">
							<p className="mt-3 text-gray-600 dark:text-gray-300 text-2xl font-semibold">
								{isLogin ? 'Welcome back' : 'Create your account'}
							</p>
						</div>

						<div className="mt-8">
							{children}
							<div className="mt-10">
								<div className="flex items-center justify-between mt-4">
									<span className="w-1/5 border-b border-gray-400 dark:border-gray-600 lg:w-1/4"></span>

									<a
										href="#"
										className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
									>
										OR
									</a>

									<span className="w-1/5 border-b border-gray-400 dark:border-gray-400 lg:w-1/4"></span>
								</div>
								<button className="flex items-center justify-center mt-7 text-gray-600 transition-colors duration-300 transform border border-gray-400 rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 w-full">
									<div className="px-4 py-2">
										<GoogleIcon />
									</div>

									<span className="w-5/6 px-4 py-3 font-bold text-center">Continue with Google</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AuthLayout;
