'use client';
import { MenuIcon } from '@/assets/svgIcons';
import Link from 'next/link';
import React, { useState } from 'react';
import { useUser } from '@/context/context-provider';
import axios from 'axios';
import { toast } from 'react-toastify';

const Nav = ({ showAside, toggleAside }) => {
	const { state, setCurrentSession } = useUser();
	const [loading, setLoading] = useState(false);

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
			console.log(response?.data?.data);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			const err = error?.response?.data?.error;
			toast.error(err ?? 'An error occured');
		}
	};
	return (
		<div className="navbar dark:bg-gray-900 dark:border-gray-700 z-20 left-0 lg:left-auto">
			<div className="navbar-start lg:hidden">
				<Link href="/" className="btn btn-ghost text-primary text-xl">
					DiagnoSync
				</Link>
			</div>
			<div className="navbar-start hidden lg:block">
				<h2 href="/" className=" text-white text-md">
					{state?.currentSession?.title}
				</h2>
			</div>

			{/* <div className="navbar-center">
			hello
			</div> */}

			<div className="navbar-end">
				<div className="lg:hidden">
					<label tabIndex={0} className="btn btn-ghost btn-circle" onClick={toggleAside}>
						<MenuIcon />
					</label>
				</div>

				<div className="hidden lg:block">
					<button
						onClick={handleNewSession}
						className="px-4 py-2 bg-primary disabled:opacity-5 text-white rounded-md"
						disabled={loading}
					>
						New session
					</button>
				</div>
			</div>
		</div>
	);
};

export default Nav;
