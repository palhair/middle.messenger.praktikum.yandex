import Block from '../../core/Block';
import { MenuItem, MenuItemProps } from '../menu-item/menu-item';
import addUser from '../../assets/addUser.svg';
import delUser from '../../assets/delUser.svg';
import delChat from '../../assets/delChat.svg';
import { addUserDialog, delChatDialog, delUserDialog } from '.';
// import { CreateDialog } from '../create-dialog/create-dialog';
import { addUsertoChat, deleteChatById, deleteUsersfromChat, getChatUserByName } from '../../services/chats';
import { searchUserByLogin } from '../../services/users';
import { Chat } from '../../api/type';
import { Dialog } from '../dialog/dialog';

export type DialogOptions = {
	dialogTitle?: string;
	dialogRef?: string;
	dialogInputLabel?: string;
	dialogButtonlabel?: string;
	onGo?: (e: Event) => void;
	type?: string;
	modificator?: string;
};

interface ChatDropdownProps {
	menuItems: MenuItemProps[];
	addUser: string;
	delUser: string;
	delChat: string;
	showAddUser: (event: Event) => void;
	showDelUser: (event: Event) => void;
	showDelChat: (event: Event) => void;
	dialog: () => Dialog;
	currentChat: () => Chat;
}

type ChatDropdownRefs = {
	currentChat: Dialog;
	addUser: MenuItem;
};

export class ChatDropdown extends Block<ChatDropdownProps, ChatDropdownRefs> {
	constructor(props: ChatDropdownProps) {
		super({
			...props,
			addUser,
			delUser,
			delChat,

			showAddUser: (e) => {
				e.preventDefault();
				this.createNewDialog({ ...addUserDialog, onGo: this.addUser.bind(this) });
			},
			showDelUser: (e) => {
				e.preventDefault();
				this.createNewDialog({ ...delUserDialog, onGo: this.delUser.bind(this) });
			},
			showDelChat: (e) => {
				e.preventDefault();
				this.createNewDialog({ ...delChatDialog, onGo: this.delChat.bind(this) });
			},
		});
	}

	async addUser(e: Event) {
		e.preventDefault();
		const dialog = this.props.dialog();
		const login = dialog.getDialogValue();

		if (!login) {
			dialog.setError('Введите имя пользователя!');
			return;
		}
		const chatId = this.props.currentChat().id;

		const user = await searchUserByLogin({ login }).catch((error) => dialog.setError(error));

		if (user) {
			const addUserData = {
				users: [user.id],
				chatId,
			};
			addUsertoChat(addUserData) // TODO: добваить окно "пользователь добавлен"
				.then(() => window.store.set({ isOpenDialog: false }))
				.catch((error) => {
					this.refs.currentChat.setError(error);
				});
		}
	}

	async delUser(e: Event) {
		e.preventDefault();
		const dialog = this.props.dialog();
		const login = dialog.getDialogValue();

		if (!login) {
			dialog.setError('Введите имя пользователя!');
			return;
		}

		const chatId = this.props.currentChat().id;

		const userToDeleted = await getChatUserByName(chatId, login).catch((error) => dialog.setError(error));

		if (userToDeleted) {
			deleteUsersfromChat({
				users: [userToDeleted.id],
				chatId,
			})
				.then(() => window.store.set({ isOpenDialog: false }))
				.catch((error) => {
					this.refs.currentChat.setError(error);
				});
		}
	}

	async delChat() {
		const chatId = this.props.currentChat().id;
		console.log(this.refs);

		await deleteChatById(chatId)
			.then(() => window.store.set({ isOpenDialog: false }))
			.catch((error) => {
				this.refs.currentChat.setError(error);
			});
	}

	createNewDialog(dialogOptions: DialogOptions) {
		window.store.set({ dialogOptions, isOpenDialog: true });
	}

	render() {
		return `<div class='chat-dropdown'>
					
					<ul class='chat-dropdown__list'>
							<li>{{{MenuItem src=addUser alt='addUser' label='Добавить пользователя' ref='addUser' onClick=showAddUser}}}</li>
							<li>{{{MenuItem src=delUser alt='delUser' label='Удалить пользователя' ref='delUser' onClick=showDelUser}}}</li>
							<li>{{{MenuItem src=delChat alt='delChat' label='Удалить чат' ref='delChat' onClick=showDelChat}}}</li>
				
					</ul>
				</div>`;
	}
}
