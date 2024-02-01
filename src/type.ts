import { Chat, User } from './api/type';
import { dialogOptions } from './components/chat-dropdown/chat-dropdown';

export type AppState = {
	error: Nullable<string>;
	user: Nullable<User>;
	isOpenDialog: boolean;
	chats: Chat[];
	dialogOptions: dialogOptions;
	messages: any[];
};
