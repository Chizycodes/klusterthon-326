'use client';
import React, { useState } from 'react';
import Aside from './Aside';
import Nav from './Nav';

const Dashboard = ({ children }) => {
	const [showAside, setShowAside] = useState(false);

	const toggleAside = () => {
		setShowAside(!showAside);
	};
	return (
		<div className="w-full flex h-screen overflow-hidden">
			{/* Show on small screen */}
			<div
				className={`lg:hidden w-80 max-w-full fixed lg:relative z-20 ${
					showAside ? 'translate-x-0' : '-translate-x-full'
				} transform transition-transform ease-in-out overflow-hidden`}
			>
				<Aside />
			</div>
			{/* Show on large screen */}
			<div className={`lg:w-80 hidden lg:block w-5/6 fixed lg:relative `}>
				<Aside />
			</div>
			<div className={`w-full h-full`}>
				<Nav showAside={showAside} toggleAside={toggleAside} />
				<div className="max-w-5xl mx-auto px-5 ">{children}</div>
			</div>
		</div>
	);
};

export default Dashboard;
