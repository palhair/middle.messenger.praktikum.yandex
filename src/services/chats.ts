import { ChatAPI } from '../api/chatsAPI';
import { chatUsersData } from '../api/type';
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

const addUsertoChat = async (data: chatUsersData) => {
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

const getUnreadCount = async (id: number) => {
	const response = await chatsApi.getNewMessage(id);
	if (apiHasError(response)) {
		throw Error(response.reason);
	}

	return response.unread_count;
};

const getChatUsers = async (id: number) => {
	const response = await chatsApi.getChatUsers(id);
	if (apiHasError(response)) {
		throw Error(response.reason);
	}

	return response;
};

const deleteChatById = async (id: number) => {
	const response = await chatsApi.deleteChat({ chatId: id });
	if (apiHasError(response)) {
		throw Error(response.reason);
	}

	const chats = await getChats();
	window.store.set({ chats });

	return response;
};

const getChatUserByName = async (chatId: number, username: string) => {
	const response = await chatsApi.getChatUsers(chatId);
	if (apiHasError(response)) {
		throw Error(response.reason);
	}

	const user = response.find((user) => {
		return user.login === username;
	});

	if (!user) {
		throw new Error('Такого пользователя нет в чате!');
	}
	return user;
};

const deleteUsersfromChat = async (data: chatUsersData) => {
	const response = await chatsApi.geleteUsersfromChat(data);
	if (apiHasError(response)) {
		throw Error(response.reason);
	}
};

export {
	createChat,
	getChats,
	getToken,
	addUsertoChat,
	getUnreadCount,
	getChatUsers,
	getChatUserByName,
	deleteUsersfromChat,
	deleteChatById,
};
