'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { DiagnosisIcon, HistoryIcon, ProfileIcon, SettingIcon } from '@/assets/svgIcons';
import { usePathname } from 'next/navigation';
import { useUser } from '@/context/context-provider';

const menu = [
	{
		icon: <DiagnosisIcon />,
		text: 'Get Diagnosis',
		link: '/',
	},
	{
		icon: <HistoryIcon />,
		text: 'Diagnosis History',
		link: '/history',
	},
	{
		icon: <SettingIcon />,
		text: 'Setting',
		link: '/setting',
	},
];

const Aside = () => {
	const pathname = usePathname();
	const { state } = useUser();
	return (
		<aside className="flex flex-col w-full h-screen px-5 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
			<Link href="/" className="text-primary font-bold text-2xl">
				DiagnoSync
			</Link>

			<div className="flex flex-col justify-between flex-1 mt-6">
				<nav className="flex-1 -mx-3 space-y-3 ">
					{menu.map((item, index) => (
						<Link
							key={index}
							className={`flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 ${
								pathname === item.link ? 'bg-primary text-white' : ''
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
							<Image
								className="object-cover rounded-full h-7 w-7"
								width={100}
								height={100}
								src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&h=634&q=80"
								alt="avatar"
							/>
							<span className="text-sm font-medium text-gray-700 dark:text-gray-200">{state?.user?.name}</span>
						</Link>

						<Link
							href="#"
							className="text-gray-500 transition-colors duration-200 rotate-180 dark:text-gray-400 rtl:rotate-0 hover:text-blue-500 dark:hover:text-blue-400"
						>
							<ProfileIcon />
						</Link>
					</div>
				</div>
			</div>
		</aside>
	);
};

export default Aside;
