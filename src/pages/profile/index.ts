import './profile.css';
import ProfilePage from './profile';
export default ProfilePage;
import * as validators from '../../utils/validators';
import { DialogOptions } from '../../components/chat-dropdown/chat-dropdown';

export const personalData = [
	{
		name: 'email',
		type: 'text',
		readonly: true,
		label: 'Почта',
		modificator: '_inline',
		validate: validators.email,
	},
	{
		name: 'login',
		type: 'text',
		readonly: true,
		label: 'Логин',
		modificator: '_inline',
		validate: validators.login,
	},
	{
		name: 'first_name',
		type: 'text',
		readonly: true,
		label: 'Имя',
		modificator: '_inline',
		validate: validators.name,
	},
	{
		name: 'second_name',
		type: 'text',
		readonly: true,
		label: 'Фамилия',
		modificator: '_inline',
		validate: validators.name,
	},
	{
		name: 'display_name',
		type: 'text',
		readonly: true,
		label: 'Имя в чате',
		modificator: '_inline',
		validate: validators.name,
	},
	{
		name: 'phone',
		type: 'tel',
		readonly: true,
		label: 'Телефон',
		modificator: '_inline',
		validate: validators.phone,
	},
];

export const addAvatar: DialogOptions = {
	dialogTitle: 'Загрузите файл',
	dialogRef: 'changeAvatar',
	dialogInputLabel: 'Файл',
	dialogButtonlabel: 'Загрузить',
	type: 'file',
	modificator: 'dialog',
};
