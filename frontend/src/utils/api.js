import { toast } from 'react-toastify';
import Axios from './axiosInterceptor';

const getUser = async (token, setUser) => {
	try {
		const response = await Axios.get(`/auth/user`);
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
		const response = await Axios.get(`/session`);
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
		const response = await Axios.get(`/session/${id}`);
		const data = response?.data?.data;
		setCurrentSession(data);
		return data;
	} catch (error) {
		const err = error?.response?.data?.error;
		toast.error(err);
	}
};

export { getUser, getSessions, getSession };
