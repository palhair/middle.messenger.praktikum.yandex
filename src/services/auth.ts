import { AuthAPI } from '../api/authAPI';
import { CreateUser, LoginReqData } from '../api/type';
import { Router } from '../core/Router';
import { PageName } from '../core/core-env';
import { apiHasError } from '../utils/apiHasError';
import { getChats } from './chats';

const authApi = new AuthAPI();

const getUser = async () => {
	const resoponseUser = await authApi.getUser();

	if (apiHasError(resoponseUser)) {
		throw new Error(resoponseUser.reason);
	}
	return resoponseUser;
};

const signin = async (data: LoginReqData) => {
	const response = await authApi.login(data);
	if (apiHasError(response)) {
		throw new Error(response.reason);
	}

	const me = await getUser();
	const chats = await getChats();

	Router.go('/messenger');
	window.store.set({ user: me, chats });
};

const signup = async (data: CreateUser) => {
	const response = await authApi.create(data);
	if (apiHasError(response)) {
		throw new Error(response.reason);
	}

	const me = await getUser();
	window.store.set({ user: me });
	Router.go('/messenger');
};

const logout = async () => {
	const response = await authApi.logout();
	if (apiHasError(response)) {
		throw new Error(response.reason);
	}
	window.store.set({ user: null, chats: [] });
	Router.go(PageName.Login);
};

export { getUser, signin, signup, logout };
