import './profile.css';
export { ProfilePage as default } from './profile';
import * as validators from '../../utils/validators';

export const personalData = [
	{
		name: 'mail',
		type: 'text',
		value: 'pochta@yandex.ru',
		readonly: false,
		label: 'Почта',
		modificator: '_inline',
		validate: validators.email,
	},
	{
		name: 'login',
		type: 'text',
		value: 'ivanivanov',
		readonly: true,
		label: 'Логин',
		modificator: '_inline',
		validate: validators.login,
	},
	{
		name: 'first_name',
		type: 'text',
		value: 'Иван',
		readonly: true,
		label: 'Имя',
		modificator: '_inline',
		validate: validators.name,
	},
	{
		name: 'second_name',
		type: 'text',
		value: 'Иванов',
		readonly: true,
		label: 'Фамилия',
		modificator: '_inline',
		validate: validators.name,
	},
	{
		name: 'display_name',
		type: 'text',
		value: 'Иван',
		readonly: true,
		label: 'Имя в чате',
		modificator: '_inline',
		validate: validators.name,
	},
	{
		name: 'phone',
		type: 'tel',
		value: '+7(909)967-3030',
		readonly: true,
		label: 'Телефон',
		modificator: '_inline',
		validate: validators.phone,
	},
];
