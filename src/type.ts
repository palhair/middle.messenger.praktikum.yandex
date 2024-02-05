import { Chat, User } from './api/type';
import { dialogOptions } from './components/chat-dropdown/chat-dropdown';

export type AppState = {
	error: Nullable<string>;
	user: Nullable<User>;
	isOpenDialog: boolean;
	chats: Chat[];
	dialogOptions: dialogOptions;
	personalData: personalDataType[];
	avatar: string;
};

export type MessageType = {
	content: string;
	id: number;
	time: string;
	type: string;
	user_id: number;
};

export type DisplayMessage = {
	kind: string;
	type: string;
	date: string;
	text: string;
};

export type personalDataType = {
	name: string;
	type: string;
	value?: string | number;
	readonly: boolean;
	label: string;
	modificator: string;
	validate: (value: string) => string | false;
};
