import { HTTPTransport } from '../core/HTTPTransport';
import { APIError, ChatDeleted, Chat, CreateChat, chatId, token, chatUsersData, newMessgeCount, User } from './type';

const chatsApi = new HTTPTransport('/chats');

export class ChatAPI {
	async getChats(): Promise<Chat[]> {
		return chatsApi
			.get('')
			.then((res) => res.response)
			.catch((err) => err);
	}

	async createChat(data: CreateChat) {
		return chatsApi
			.post('/', { data })
			.then((res) => res.response)
			.catch((err) => err);
	}

	async deleteChat(data: chatId): Promise<ChatDeleted | APIError> {
		return chatsApi
			.delete('', { data })
			.then((res) => res.response)
			.catch((err) => err);
	}

	async getToken(id: number): Promise<token> {
		return chatsApi
			.post(`/token/${id}`)
			.then((res) => res.response)
			.catch((err) => err);
	}

	async addUserToChat(data: chatUsersData): Promise<void | APIError> {
		return chatsApi
			.put(`/users`, { data })
			.then((res) => res.response)
			.catch((err) => err);
	}

	async getNewMessage(id: number): Promise<newMessgeCount> {
		return chatsApi
			.get(`/new/${id}`)
			.then((res) => res.response)
			.catch((err) => err);
	}

	async getChatUsers(id: number): Promise<User[]> {
		return chatsApi
			.get(`/${id}/users`)
			.then((res) => res.response)
			.catch((err) => err);
	}

	async geleteUsersfromChat(data: chatUsersData): Promise<void | APIError> {
		return chatsApi
			.delete(`/users`, { data })
			.then((res) => res.response)
			.catch((err) => err);
	}
	// async logout(): Promise<void> {
	// 	return chatsApi
	// 		.get('/logout')
	// 		.then((res) => res.response)
	// 		.catch((err) => err);
	// }
}
