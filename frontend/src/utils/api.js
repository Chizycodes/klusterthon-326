import axios from 'axios';
import { toast } from 'react-toastify';

const getUser = async (token, setUser) => {
	try {
		const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/user`, {
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${token}`,
			},
		});
		const data = response?.data?.data;
		setUser(data);
		return data;
	} catch (error) {
		const err = error?.response?.data?.error;
		toast.error(err);
	}
};

const getSessions = async (token, setChatSessions) => {
	try {
		const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/session`, {
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${token}`,
			},
		});
		const data = response?.data?.data;
		setChatSessions(data?.reverse());
		return data;
	} catch (error) {
		const err = error?.response?.data?.error;
		toast.error(err);
	}
};

const getSession = async (token, setCurrentSession, id) => {
	try {
		const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/session/${id}`, {
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${token}`,
			},
		});
		const data = response?.data?.data;
		setCurrentSession(data);
		return data;
	} catch (error) {
		const err = error?.response?.data?.error;
		toast.error(err);
	}
};

export { getUser, getSessions, getSession };
