export type Validator = (value: string) => string | boolean;

export const login: Validator = (value) => {
	const errorLength = checkLength(3, 20, value);
	if (errorLength) {
		return errorLength;
	}

	const test = /[^A-Za-z0-9-_]+/.test(value);
	if (!test) {
		if (!/[A-Za-z]+/.test(value)) {
			return 'должна быть хотя бы 1 буква';
		}
		return false;
	}
	return 'Можно использовать латиницу, цифры, _, -';
};

export const password: Validator = (value) => {
	const errorLength = checkLength(8, 40, value);
	if (errorLength) {
		return errorLength;
	}

	if (!/[A-ZА-Я]+/.test(value)) {
		return 'должна быть хотя бы 1 заглавная буква';
	}

	if (!/\d+/.test(value)) {
		return 'должна быть хотя бы 1 цифра';
	}

	return false;
};

export const email: Validator = (value) => {
	const test = /[-.\w]+@([\w-_]*[A-Za-z]+[\w-_]*\.)+[A-Za-z]+/.test(value);
	if (!test) {
		return 'Email некорректен';
	}

	return false;
};

export const name: Validator = (value) => {
	if (value.length === 0) {
		return 'Это поле не может быть пустым';
	}
	const test = /[^A-Za-zА-Яа-я-]/.test(value);
	if (test) {
		return 'допустимы только латинские или кириллические буквы и тире';
	}
	if (!/^[A-ZА-Я]/.test(value)) {
		return 'Первая буква должна быть заглавной';
	}

	return false;
};

export const phone: Validator = (value) => {
	const errorLength = checkLength(10, 15, value);
	if (errorLength) {
		return errorLength;
	}

	if (!/^\+?\d{10,15}$/.test(value)) {
		return 'Допустимы только цифры. В начале допустим знак +';
	}

	return false;
};

export const message: Validator = (value) => {
	if (value.length === 0) {
		return 'Нельзя отправить пустое сообщение!';
	}

	return false;
};

const checkLength = (min: number, max: number, value: string) => {
	if (value.length === 0) {
		return 'Поле не может быть пустым';
	}
	if (value.length < min) {
		return `Длина не должна быть меньше ${min} символов`;
	}
	if (value.length > max) {
		return `Длина не должна превышать ${max} символов`;
	}
	return false;
};
