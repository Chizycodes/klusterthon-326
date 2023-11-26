import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useEffect, useReducer } from 'react';

const UserContext = createContext();

const initialState = {
	user: null,
	isAuth: null,
	token: null,
	chatSessions: [],
	currentSession: null,
	loading: false,
};

const userReducer = (state, action) => {
	switch (action.type) {
		case 'SET_USER':
			return { ...state, user: action.payload };
		case 'SET_CHAT_SESSIONS':
			return { ...state, chatSessions: action.payload, currentSession: action.payload[0] };
		case 'SET_CURRENT_SESSION':
			return { ...state, currentSession: action.payload };
		case 'SET_AUTH_TOKEN':
			return { ...state, isAuth: action.payload.isAuth, token: action.payload.token };
		case 'LOGOUT':
			typeof window !== 'undefined' && localStorage.removeItem('authToken');
			return { ...initialState, isAuth: false };
		default:
			return state;
	}
};

const ContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(userReducer, initialState);
	const router = useRouter();

	const setUser = (user) => {
		dispatch({ type: 'SET_USER', payload: user });
	};
	const setChatSessions = (sessions) => {
		dispatch({ type: 'SET_CHAT_SESSIONS', payload: sessions });
	};
	const setCurrentSession = (session) => {
		dispatch({ type: 'SET_CURRENT_SESSION', payload: session });
	};
	const setToken = (payload) => {
		dispatch({ type: 'SET_AUTH_TOKEN', payload: payload });
	};
	const logout = () => {
		dispatch({ type: 'LOGOUT' });
		router.push('/login');
	};

	useEffect(() => {
		// Check if authToken is available in local storage during initialization
		const authToken = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

		if (authToken) {
			setToken({ isAuth: true, token: authToken });
		} else {
			setToken({ isAuth: false, token: null });
		}
	}, []);

	const contextValue = {
		state,
		setUser,
		setToken,
		setChatSessions,
		setCurrentSession,
		logout,
	};

	return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

const useUser = () => {
	const context = useContext(UserContext);

	return context;
};

export { ContextProvider, useUser };
