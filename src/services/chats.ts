import { ChatAPI } from '../api/chatsAPI';
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

export { createChat, getChats };
