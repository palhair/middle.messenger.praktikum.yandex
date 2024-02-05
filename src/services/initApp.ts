import { Router } from '../core/Router';
import { getUser } from './auth';
import { getChats } from './chats';

const initApp = async () => {
	let user = null;

	try {
		user = await getUser();
	} catch (error) {
		return;
	}

	const chats = await getChats();
	Router.go('/messenger');
	window.store.set({ user, chats });
};

const initChatPage = async () => {
	let user = null;

	try {
		user = await getUser();
	} catch (error) {
		Router.go('/');
		return;
	}
	const chats = await getChats();
	window.store.set({ chats });
	return user;
};

const initProfilePage = async () => {
	let user = null;

	try {
		user = await getUser();
	} catch (error) {
		Router.go('/');
		return;
	}
	window.store.set({ user });
};

export { initChatPage, initProfilePage, initApp };
