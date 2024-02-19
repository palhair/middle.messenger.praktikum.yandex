import Block from '../../core/Block';
import addChatIcon from '../../assets/addChat.svg';
import { DialogOptions } from '../chat-dropdown/chat-dropdown';
import { addUserDialog } from '.';
import { createChat } from '../../services/chats';
import { Dialog } from '../dialog/dialog';

interface AddChatButtonProps {
	addChatIcon: string;
	addChat: (event: Event) => void;
	dialog: () => Dialog;
}

export class AddChatButton extends Block<AddChatButtonProps> {
	constructor(props: AddChatButtonProps) {
		super({
			...props,
			addChatIcon,
			addChat: (e: Event) => {
				e.preventDefault();
				this.createNewDialog({ ...addUserDialog, onGo: this.createNewChat.bind(this) });
				window.store.set({ isOpenDialog: true });
			},
		});
	}

	createNewChat(event: Event) {
		event.preventDefault();
		const dialog = this.props.dialog();
		console.log('submit');
		const newChatName = dialog.getDialogValue();

		if (!newChatName) {
			dialog.setError('Введите название чата!');
			return;
		}
		createChat(newChatName)
			.then(() => window.store.set({ isOpenDialog: false }))
			.catch((error) => dialog.setError(error));
	}

	createNewDialog(dialogOptions: DialogOptions) {
		console.log(dialogOptions);
		window.store.set({ dialogOptions });
	}

	protected render(): string {
		return `<div class='add-chat-button' >
					{{{Button src=addChatIcon  alt='Add chat' onClick=addChat withIcon=true}}}
				</div>`;
	}
}
