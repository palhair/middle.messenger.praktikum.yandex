import Block from '../../core/Block';
import addChatIcon from '../../assets/addChat.svg';
import { dialogOptions } from '../chat-dropdown/chat-dropdown';
import { addUserDialog } from '.';
import { CreateDialog } from '../create-dialog/create-dialog';
import { createChat } from '../../services/chats';

interface AddChatButtonProps {
	addChatIcon: string;
	addChat: (event: Event) => void;
	dialog: () => CreateDialog;
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
		const newChatName = dialog.getDialogValue();

		if (!newChatName) {
			dialog.setError('Введите название чата!');
			return;
		}
		createChat(newChatName)
			.then(() => window.store.set({ isOpenDialog: false }))
			.catch((error) => dialog.setError(error));
	}

	createNewDialog(dialogOptions: dialogOptions) {
		window.store.set({ dialogOptions });
	}

	protected render(): string {
		return `<div class='add-chat-button' >
					{{{Button src=addChatIcon  alt='Add chat' onClick=addChat withIcon=true}}}
				</div>`;
	}
}
