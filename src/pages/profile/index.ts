import './profile.css';
export { ProfilePage as default } from './profile';

export const personalData = [
	{
		name: 'mail',
		type: 'text',
		value: 'pochta@yandex.ru',
		readonly: true,
		label: 'Почта',
		modificator: '_inline',
	},
	{
		name: 'login',
		type: 'text',
		value: 'ivanivanov',
		readonly: true,
		label: 'Логин',
		modificator: '_inline',
	},
	{
		name: 'first_name',
		type: 'text',
		value: 'Иван',
		readonly: true,
		label: 'Имя',
		modificator: '_inline',
	},
	{
		name: 'second_name',
		type: 'text',
		value: 'Иванов',
		readonly: true,
		label: 'Фамилия',
		modificator: '_inline',
	},
	{
		name: 'display_name',
		type: 'text',
		value: 'Иван',
		readonly: true,
		label: 'Имя в чате',
		modificator: '_inline',
	},
	{
		name: 'phone',
		type: 'tel',
		value: '+7(909)967-3030',
		readonly: true,
		label: 'Телефон',
		modificator: '_inline',
	},
];
