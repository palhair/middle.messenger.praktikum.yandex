import { DialogOptions } from './chat-dropdown';
import './chat-dropdown.css';
export { ChatDropdown as default } from './chat-dropdown';

export const addUserDialog: DialogOptions = {
	dialogTitle: 'Добавить нового пользователя',
	dialogRef: 'addUser',
	dialogInputLabel: 'Имя пользователя',
	dialogButtonlabel: 'Добавить',
};

export const delUserDialog: DialogOptions = {
	dialogTitle: 'Удалить пользователя',
	dialogRef: 'delUser',
	dialogInputLabel: 'Имя пользователя',
	dialogButtonlabel: 'Удалить',
};

export const delChatDialog: DialogOptions = {
	dialogTitle: 'Удалить чат',
	dialogRef: 'delChat',
	dialogButtonlabel: 'Удалить',
};
