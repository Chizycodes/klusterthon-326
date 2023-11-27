'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { DiagnosisIcon, HistoryIcon, ProfileIcon, SettingIcon } from '@/assets/svgIcons';
import { useParams, usePathname } from 'next/navigation';
import { useUser } from '@/context/context-provider';
import { menu } from '@/utils/constants';

const Aside = () => {
	const pathname = usePathname();
	const { id } = useParams();
	const { state, logout } = useUser();

	const isActiveLink = (itemLink) => {
		return pathname === itemLink || (pathname === `/${id}` && itemLink === '/');
	};

	return (
		<aside className="flex flex-col w-full h-screen px-5 py-8 overflow-y-auto border-r rtl:border-r-0 rtl:border-l bg-gray-900 border-gray-700">
			<Link href="/" className="text-primary font-bold text-2xl">
				DiagnoSync
			</Link>

			<div className="flex flex-col justify-between flex-1 mt-6">
				<nav className="flex-1 -mx-3 space-y-3 ">
					{menu.map((item, index) => (
						<Link
							key={index}
							className={`flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg text-gray-300 hover:bg-gray-800 hover:text-gray-200 ${
								isActiveLink(item.link) ? 'bg-primary text-white' : ''
							}`}
							href={item.link}
						>
							{item.icon}
							<span className="mx-2 text-sm font-medium">{item.text}</span>
						</Link>
					))}
				</nav>

				<div className="mt-6">
					<div className="flex items-center justify-between mt-6">
						<Link href="#" className="flex items-center gap-x-2">
							<div className="w-8 h-8 rounded-full text-white uppercase bg-primary text-sm">
								<div className="h-full flex items-center justify-center text-white">
									{state?.user?.name?.slice(0, 2)}
								</div>
							</div>
							<span className="text-sm font-medium text-gray-200">{state?.user?.name}</span>
						</Link>

						<div
							onClick={() => logout()}
							title="Logout"
							className="btn btn-ghost text-gray-500 transition-colors duration-200 rotate-180 dark:text-gray-400 rtl:rotate-0 hover:text-blue-500 dark:hover:text-blue-400"
						>
							<ProfileIcon />
						</div>
					</div>
				</div>
			</div>
		</aside>
	);
};

export default Aside;
