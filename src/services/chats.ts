import { ChatAPI } from '../api/chatsAPI';
import { addUserToChatData } from '../api/type';
import { apiHasError } from '../utils/apiHasError';

const chatsApi = new ChatAPI();

const getChats = async () => {
	const responseChats = await chatsApi.getChats();
	if (apiHasError(responseChats)) {
		throw Error(responseChats.reason);
	}

	return responseChats;
};

const createChat = async (title: string) => {
	const response = await chatsApi.createChat({ title });
	if (apiHasError(response)) {
		throw Error(response.reason);
	}

	const chats = await getChats();
	window.store.set({ chats });
};

const addUsertoChat = async (data: addUserToChatData) => {
	const response = await chatsApi.addUserToChat(data);
	if (apiHasError(response)) {
		console.log(response.reason);
		throw Error(response.reason);
	}
};

const getToken = async (id: number) => {
	const response = await chatsApi.getToken(id);
	if (apiHasError(response)) {
		throw Error(response.reason);
	}

	return response.token;
};

export { createChat, getChats, getToken, addUsertoChat };
