'use client';
import React, { useState } from 'react';
import Aside from './Aside';
import Nav from './Nav';

const DashboardLayout = ({ children }) => {
	const [showAside, setShowAside] = useState(false);

	const toggleAside = () => {
		setShowAside(!showAside);
	};
	return (
		<div className="w-full flex">
			<div
				className={`lg:hidden max-w-64 fixed lg:relative ${
					showAside ? 'translate-x-0' : '-translate-x-full'
				} transform transition-transform ease-in-out overflow-hidden`}
			>
				<Aside />
			</div>
			<div
				className={`lg:w-2/12 hidden lg:block w-5/6 max-w-64 fixed lg:relative`}
			>
				<Aside />
			</div>
			<div className={`lg:w-10/12 w-full px-5`}>
				<Nav showAside={showAside} toggleAside={toggleAside} />
				{children}
			</div>
		</div>
	);
};

export default DashboardLayout;
