'use client';
import { MenuIcon } from '@/assets/svgIcons';
import Link from 'next/link';
import React, { useState } from 'react';
import { useUser } from '@/context/context-provider';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getSessions } from '@/utils/api';
import { usePathname } from 'next/navigation';
import { menu } from '@/utils/constants';
import Router from 'next/router';

const Nav = ({ showAside, toggleAside }) => {
	const { state, setCurrentSession, setChatSessions } = useUser();
	const [loading, setLoading] = useState(false);
	const pathname = usePathname();

	const handleNewSession = async () => {
		try {
			setLoading(true);
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/session`,
				{},
				{
					headers: {
						'Content-Type': 'application/json',
						authorization: `Bearer ${state?.token}`,
					},
				}
			);
			setCurrentSession(response?.data?.data);
			await getSessions(state.token, setChatSessions);
			if (pathname !== '/') {
				Router.push('/');
			}
			setLoading(false);
		} catch (error) {
			setLoading(false);
			const err = error?.response?.data?.error;
			toast.error(err);
		}
	};
	return (
		<div className="navbar dark:bg-gray-900 dark:border-gray-700 z-20 left-0 lg:left-auto lg:px-10">
			<div className="navbar-start lg:hidden">
				<Link href="/" className="btn btn-ghost text-primary text-xl">
					DiagnoSync
				</Link>
			</div>
			<div className="navbar-start hidden lg:block">
				<h2 className="font-bold text-white text-xl">
					{pathname === '/' ? state?.currentSession?.title : menu.find((item) => item.link === pathname)?.text}
				</h2>
			</div>

			<div className="navbar-end">
				<div className="lg:hidden">
					<label tabIndex={0} className="btn btn-ghost btn-circle" onClick={toggleAside}>
						<MenuIcon />
					</label>
				</div>

				<div className="hidden lg:block">
					<button
						onClick={handleNewSession}
						className="px-4 py-2 bg-primary disabled:opacity-50 text-white rounded-md font-bold flex items-center justify-center"
						disabled={loading}
					>
						New session {loading && <span className="loading loading-spinner loading-md"></span>}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Nav;
