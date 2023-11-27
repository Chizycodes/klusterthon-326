import axios from 'axios';

const Axios = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Request interceptor
Axios.interceptors.request.use(
	(config) => {
		const accessToken = localStorage.getItem('authToken');

		if (accessToken) {
			if (config.headers) config.headers.authorization = `Bearer ${accessToken}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Response interceptor
Axios.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default Axios;
