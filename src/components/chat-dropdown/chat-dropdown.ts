import Block from '../../core/Block';
import { MenuItemProps } from '../menu-item/menu-item';
import addUser from '../../assets/addUser.svg';
import delUser from '../../assets/delUser.svg';
import delChat from '../../assets/delChat.svg';
import { addUserDialog, delChatDialog, delUserDialog } from '.';
import { CreateDialog } from '../create-dialog/create-dialog';
import { getUser } from '../../services/auth';
import { addUsertoChat } from '../../services/chats';

export type dialogOptions = {
	dialogTitle?: string;
	dialogRef?: string;
	dialogInputLabel?: string;
	dialogButtonlabel?: string;
	onGo?: (e: Event) => void;
};

interface ChatDropdownProps {
	menuItems: MenuItemProps[];
	addUser: string;
	delUser: string;
	delChat: string;
	showAddUser: (event: Event) => void;
	showDelUser: (event: Event) => void;
	showDelChat: (event: Event) => void;
}

type ChatDropdownRefs = {
	currentChat: CreateDialog;
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
		const id = 1350075;
		const chatId = 48850;
		const addUserData = {
			users: [id],
			chatId,
		};
		addUsertoChat(addUserData);

		// const user = this.props.dialog().getDialogValue();

		// if (!user) {
		// 	this.refs.currentChat.setError('Это поле не может быть пустым');
		// 	return;
		// }
		// createChat(user)
		// 	.then(() => window.store.set({ isOpenDialog: false }))
		// 	.catch((error) => {
		// 		this.refs.currentChat.setError(error);
		// 	});
	}
	delUser(e: Event) {
		e.preventDefault();
		console.log('2');
	}

	delChat() {
		//Удаление текущего чата
	}

	createNewDialog(dialogOptions: dialogOptions) {
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
