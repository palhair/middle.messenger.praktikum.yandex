import { User } from '../api/type';
import constants from '../constants';
import { getToken } from '../services/chats';

export const getWSUrl = async (user: User, chatId: number) => {
	const resp = await getToken(chatId);

	return `${constants.WSS}/${user.id}/${chatId}/${resp}`;
};
