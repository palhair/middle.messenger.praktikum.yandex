export type APIError = {
	reason: string;
};

export type UserDTO = {
	id: number;
	first_name: string;
	second_name: string;
	display_name: string;
	phone: string;
	login: string;
	avatar: string;
	email: string;
	password: string;
};

export type CreateUser = Omit<UserDTO, 'id' | 'avatar' | 'display_name'>;

export type SignUpResponse = Pick<UserDTO, 'id'>;

export type LoginReqData = Pick<UserDTO, 'login' | 'password'>;

export type User = Omit<UserDTO, 'password'>;

export type Chat = {
	id: number;
	title: string;
	avatar: string | null;
	unread_count: number;
	created_by: number;
	last_message: LastMessage | null;
};

type LastMessage = {
	user: User;
	time: string;
	content: string;
};

export type CreateChat = {
	title: string;
};

export type deleteChat = {
	chatId: number;
};

export type ChatDeleted = {
	userId: string;
	result: Omit<Chat, 'last_message' | 'unread_coun'>;
};

export type token = {
	token: string;
};

export type addUserToChatData = {
	users: number[];
	chatId: number;
};
