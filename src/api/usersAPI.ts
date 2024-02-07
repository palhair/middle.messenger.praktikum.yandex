import { HTTPTransport } from '../core/HTTPTransport';
import { APIError, ChangePass, User, UserDTO, changeUser } from './type';

const chatsApi = new HTTPTransport('/user');

export class UsersAPI {
	async searchUser(data: Pick<UserDTO, 'login'>): Promise<APIError | User[]> {
		return chatsApi
			.post('/search', { data })
			.then((res) => res.response)
			.catch((err) => err);
	}

	async ChangeUserProfile(data: changeUser): Promise<APIError | User> {
		return chatsApi
			.put('/profile', { data })
			.then((res) => res.response)
			.catch((err) => err);
	}

	async ChangePass(data: ChangePass): Promise<APIError | void> {
		return chatsApi
			.put('/password', { data })
			.then((res) => res.response)
			.catch((err) => err);
	}

	async ChangeAvatar(data: FormData): Promise<APIError | User> {
		return chatsApi
			.put('/profile/avatar', { data })
			.then((res) => res.response)
			.catch((err) => err);
	}
}
