import { Chat, User } from './api/type';

export type AppState = {
	error: Nullable<string>;
	user: Nullable<User>;
	isOpenDialog: boolean;
	chats: Chat[];
};
