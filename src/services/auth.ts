import { AuthAPI } from '../api/authAPI';
import { CreateUser, LoginReqData } from '../api/type';
import { Router } from '../core/Router';
import { apiHasError } from '../utils/apiHasError';

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

	window.store.set({ user: me });
	Router.go('/messenger');
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
	await authApi.logout();

	window.store.set({ user: null, chats: [] });
	Router.go('/');
};

export { getUser, signin, signup, logout };
