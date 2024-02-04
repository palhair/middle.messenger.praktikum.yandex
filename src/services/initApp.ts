import { Router } from '../core/Router';
import { getUser } from './auth';
import { getChats } from './chats';

const initApp = async () => {
	let user = null;

	try {
		user = await getUser();
	} catch (error) {
		Router.go('/');
		return;
	}

	const chats = await getChats();
	Router.go('/change-pass');
	window.store.set({ user, chats });
};

const initChatPage = async () => {
	const chats = await getChats();
	window.store.set({ chats });
};

export { initApp, initChatPage };
