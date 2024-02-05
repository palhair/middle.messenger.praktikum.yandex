import { dialogOptions } from './chat-dropdown';
import './chat-dropdown.css';
export { ChatDropdown as default } from './chat-dropdown';

export const addUserDialog: dialogOptions = {
	dialogTitle: 'Добавить нового пользователя',
	dialogRef: 'addUser',
	dialogInputLabel: 'Имя пользователя',
	dialogButtonlabel: 'Добавить',
};

export const delUserDialog: dialogOptions = {
	dialogTitle: 'Удалить пользователя',
	dialogRef: 'delUser',
	dialogInputLabel: 'Имя пользователя',
	dialogButtonlabel: 'Удалить',
};

export const delChatDialog: dialogOptions = {
	dialogTitle: 'Удалить чат',
	dialogRef: 'delChat',
	dialogButtonlabel: 'Удалить',
};
