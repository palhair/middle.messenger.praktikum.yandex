import { Router } from '../core/Router';
import { setAbsoluteUrl } from '../utils/setAbsoluteURL';
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

	chats.forEach((chat) => {
		if (chat.avatar) {
			chat.avatar = setAbsoluteUrl(chat.avatar);
		}
	});

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
	let avatar;
	if (user.avatar) {
		avatar = setAbsoluteUrl(user.avatar);
	}
	window.store.set({ user, avatar });
};

export { initChatPage, initProfilePage, initApp };
