'use client';
import Dashboard from '@/components/dashboard/Dashboard';
import withAuth from '@/utils/withAuth';
import axios from 'axios';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useUser } from '@/context/context-provider';

function DashboardLayout({ children }) {
	const { state, setUser, setChatSessions } = useUser();
	const getUser = async () => {
		try {
			const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/user`, {
				headers: {
					'Content-Type': 'application/json',
					authorization: `Bearer ${state?.token}`,
				},
			});
			const data = response?.data?.data;
			setUser(data);
		} catch (error) {
			const err = error?.response?.data?.error;
			toast.error(err);
		}
	};

	const getSessions = async () => {
		try {
			const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/session`, {
				headers: {
					'Content-Type': 'application/json',
					authorization: `Bearer ${state?.token}`,
				},
			});

			setChatSessions(response?.data?.data.reverse());
		} catch (error) {
			const err = error?.response?.data?.error;
			toast.error(err ?? 'An error occured');
		}
	};

	useEffect(() => {
		getUser();
		getSessions();
	}, []);
	return (
		<div>
			<Dashboard>{children}</Dashboard>
		</div>
	);
}

export default withAuth(DashboardLayout);
