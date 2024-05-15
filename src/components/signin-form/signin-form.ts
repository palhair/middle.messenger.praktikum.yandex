import Block from '../../core/Block';
import * as validators from '../../utils/validators';
import { Props } from '../../core/core-env';
import { signup } from '../../services/auth';
import { CreateUser } from '../../api/type';
import { Button, ErrorBlock, InputField } from '../../components';
import { PageName, Router } from '../../core/Router';

interface SigninFormProps {
	onRegistration: EventListener;
	onLogin: EventListener;
	validate: {
		login: validators.Validator;
		password: validators.Validator;
		email: validators.Validator;
		name: validators.Validator;
		phone: validators.Validator;
		password_again: validators.Validator;
	};
}

type SigninFormRefs = {
	error: ErrorBlock;
	submit: Button;
	login: InputField;
	password: InputField;
	password_again: InputField;
	email: InputField;
	first_name: InputField;
	second_name: InputField;
	phone: InputField;
};

export class SigninForm extends Block<SigninFormProps, SigninFormRefs> {
	constructor(props: Props) {
		super({
			...props,
			validate: {
				login: validators.login,
				password: validators.password,
				email: validators.email,
				name: validators.name,
				phone: validators.phone,
				password_again: (value) => this.passAgainCheck(value),
			},

			onRegistration: (event: Event) => {
				event.preventDefault();
				this.refs.submit.element?.focus();
				const fieldsValue: Record<string, undefined | string> = {};
				const signinFields: ['login', 'password', 'password_again', 'email', 'first_name', 'second_name', 'phone'] = [
					'login',
					'password',
					'password_again',
					'email',
					'first_name',
					'second_name',
					'phone',
				];

				signinFields.map((field) => {
					const inputValue = this.refs[field].value();
					if (inputValue) fieldsValue[field] = inputValue;
				});

				if (
					Object.values(fieldsValue).filter((field) => {
						if (field) {
							return true;
						}
					}).length !== signinFields.length
				) {
					return;
				}

				signup(fieldsValue as CreateUser).catch((error) => this.refs.error.setProps({ error }));
			},
			onLogin: (event: Event) => {
				event.preventDefault();
				Router.go(PageName.Login);
			},
		});
	}

	protected init(): void {
		this.events = {
			submit: this.props.onRegistration,
		};
	}

	passAgainCheck(pass: string) {
		if (this.refs.password.value() !== pass) {
			return 'Пароли не совпадают';
		}

		return false;
	}

	protected render(): string {
		return `<form tag='form' class='registration-form__container'>
					{{{InputField label='Почта' type='text' ref='email' name='email' validate=validate.email}}}
					{{{InputField label='Логин' type='text' ref='login' name='login' validate=validate.login}}}
					{{{InputField label='Имя' type='text' ref='first_name' name='first_name' validate=validate.name}}}
					{{{InputField label='Фамилия' type='text' ref='second_name' name='second_name' validate=validate.name}}}
					{{{InputField label='Телефон' type='tel' ref='phone' name='phone' validate=validate.phone}}}
					{{{InputField label='Пароль' type='password' ref='password' name='password' validate=validate.password}}}
					{{{InputField
						label='Пароль (еще раз)'
						type='password'
						ref='password_again'
						name='password_again'
						validate=validate.password_again
					}}}

					{{{ErrorBlock ref='error'}}}

					<div class='registration-form__buttons-container'>
						{{{Button label='Зарегистрироваться' type='primary' onClick=onRegistration ref='submit'}}}
						{{{Button label='Войти' type='secondary' onClick=onLogin}}}

					</div>
				</form>`;
	}
}
