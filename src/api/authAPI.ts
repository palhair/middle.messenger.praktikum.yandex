import { HTTPTransport } from '../core/HTTPTransport';
import { APIError, CreateUser, LoginReqData, SignUpResponse, User } from './type';

const authApi = new HTTPTransport('/auth');

export class AuthAPI {
	async create(data: CreateUser): Promise<SignUpResponse | APIError> {
		return authApi
			.post('/signup', { data })
			.then((res) => res.response)
			.catch((err) => err);
	}

	async login(data: LoginReqData) {
		return authApi
			.post('/signin', { data })
			.then((res) => res.response)
			.catch((err) => err);
	}

	async getUser(): Promise<User | APIError> {
		return authApi
			.get('/user')
			.then((res) => res.response)
			.catch((err) => err);
	}

	async logout(): Promise<void> {
		return authApi
			.get('/logout')
			.then((res) => res.response)
			.catch((err) => err);
	}
}
