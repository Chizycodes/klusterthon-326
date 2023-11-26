'use client';
import Dashboard from '@/components/dashboard/Dashboard';
import withAuth from '@/utils/withAuth';
import { useEffect } from 'react';
import { useUser } from '@/context/context-provider';
import { getSessions, getUser } from '@/utils/api';

function DashboardLayout({ children }) {
	const { state, setUser, setChatSessions } = useUser();


	useEffect(() => {
		getUser(state.token, setUser);
		getSessions(state.token, setChatSessions);
	}, []);
	return (
		<div>
			<Dashboard>{children}</Dashboard>
		</div>
	);
}

export default withAuth(DashboardLayout);
