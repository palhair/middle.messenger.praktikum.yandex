import { HTTPTransport } from '../core/HTTPTransport';
import { APIError, ChatDeleted, Chat, CreateChat, deleteChat } from './type';

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

	async deleteChat(data: deleteChat): Promise<ChatDeleted | APIError> {
		return chatsApi
			.post('', { data })
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
