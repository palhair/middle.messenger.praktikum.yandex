import { Router } from '../core/Router';
import { getUser } from './auth';
import { getChats } from './chats';

const initApp = async () => {
	let user = null;

	console.log('initApp');
	try {
		user = await getUser();
	} catch (error) {
		Router.go('/');
		return;
	}

	const chats = await getChats();
	console.log(window.store);
	window.store.set({ user, chats });
	Router.go('/messenger');
};

const initChatPage = async () => {
	const chats = await getChats();
	window.store.set({ chats });
};

export { initApp, initChatPage };
