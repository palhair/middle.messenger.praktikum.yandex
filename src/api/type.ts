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

export type changeUser = Omit<User, 'id' | 'avatar'>;

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

export type ChatId = {
	chatId: number;
};

export type ChatDeleted = {
	userId: string;
	result: Omit<Chat, 'last_message' | 'unread_coun'>;
};

export type Token = {
	token: string;
};

export type chatUsersData = {
	users: number[];
	chatId: number;
};

export type NewMessgeCount = Pick<Chat, 'unread_count'>;

export type ChangePass = {
	oldPassword: string;
	newPassword: string;
};
