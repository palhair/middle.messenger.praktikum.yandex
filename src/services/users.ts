import { ChangePass, User, UserDTO, changeUser } from '../api/type';
import { UsersAPI } from '../api/usersAPI';
import { Router } from '../core/Router';
import { apiHasError } from '../utils/apiHasError';

const usersApi = new UsersAPI();

const searchUserByLogin = async (data: Pick<UserDTO, 'login'>): Promise<User> => {
	const response = await usersApi.searchUser(data);
	if (apiHasError(response)) {
		throw Error(response.reason);
	}
	const user = response.find((user) => {
		return user.login === data.login;
	});

	if (!user) {
		throw new Error('Пользователь не найден!');
	}

	return user;
};

const ChangeUserProfile = async (data: changeUser): Promise<User> => {
	const response = await usersApi.ChangeUserProfile(data);
	if (apiHasError(response)) {
		throw Error(response.reason);
	}

	return response;
};

const changePass = async (data: ChangePass) => {
	const response = await usersApi.ChangePass(data);
	if (apiHasError(response)) {
		throw Error(response.reason);
	}

	Router.go('/settings');
};

const changeAvatar = async (file: File) => {
	const data = new FormData();
	data.append('avatar', file);
	const response = await usersApi.ChangeAvatar(data);
	if (apiHasError(response)) {
		throw Error(response.reason);
	}

	window.store.set({ user: response });
	return response;
};

export { searchUserByLogin, ChangeUserProfile, changePass, changeAvatar };
