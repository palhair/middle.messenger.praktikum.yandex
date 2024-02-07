import { Chat, User } from './api/type';
import { DialogOptions } from './components/chat-dropdown/chat-dropdown';
import { Validator } from './utils/validators';

export type AppState = {
	error: Nullable<string>;
	user: Nullable<User>;
	isOpenDialog: boolean;
	chats: Chat[];
	dialogOptions: DialogOptions;
	personalData: PersonalDataType[];
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

export type PersonalDataType = {
	name: string;
	type: string;
	value?: string | number;
	readonly: boolean;
	label: string;
	modificator: string;
	validate: Validator;
};
