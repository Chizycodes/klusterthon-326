'use client';
import { MenuIcon } from '@/assets/svgIcons';
import React from 'react';

const Nav = ({ showAside, toggleAside }) => {
	return (
		<div className="navbar dark:bg-gray-900 dark:border-gray-700 z-20 fixed left-0 lg:left-auto">
			<div className="navbar-start">
				<a className="btn btn-ghost text-xl">DiagnoSync</a>
			</div>
			<div className="navbar-end">
				<div className="lg:hidden">
					<label tabIndex={0} className="btn btn-ghost btn-circle" onClick={toggleAside}>
						<MenuIcon />
					</label>
				</div>
			</div>
		</div>
	);
};

export default Nav;
