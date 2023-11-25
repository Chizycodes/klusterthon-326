import React, { createContext, useContext, useReducer } from 'react';

const UserContext = createContext();
let authToken = localStorage.getItem('authToken') || null;

const initialState = {
	user: null,
	isAuth: Boolean(authToken),
	token: authToken,
	chat: [],
};

const userReducer = (state, action) => {
	switch (action.type) {
		case 'SET_USER':
			return { ...state, user: action.payload };
		case 'SET_CHAT':
			return { ...state, chat: action.payload };
		default:
			return state;
	}
};

const ContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(userReducer, initialState);

	const setUser = (user) => {
		dispatch({ type: 'SET_USER', payload: user });
	};
	const setChat = (message) => {
		dispatch({ type: 'SET_CHAT', payload: message });
	};

	const contextValue = {
		state,
		setUser,
		setChat,
	};

	return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

const useUser = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('useUser must be used within a ContextProvider');
	}
	return context;
};

export { ContextProvider, useUser };
