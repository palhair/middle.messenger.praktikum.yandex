import { Button, ErrorBlock, InputField } from '..';
import { LoginReqData } from '../../api/type';
import Block from '../../core/Block';
import { Router } from '../../core/Router';
import { signin } from '../../services/auth';
import * as validators from '../../utils/validators';

type LoginRequestData = {
	login?: string;
	password?: string;
};

interface LoginFormProps {
	validate: {
		login: (value: string) => boolean | string;
		password: (value: string) => boolean | string;
	};
	onLogin: (event: Event) => void;
	error: string | null;
	navigate: (e: Event) => void;
}

type Refs = {
	login: InputField;
	password: InputField;
	error: ErrorBlock;
	submit: Button;
};
export class LoginForm extends Block<LoginFormProps, Refs> {
	constructor(props: LoginFormProps) {
		super({
			...props,
			validate: {
				login: validators.login,
				password: validators.password,
			},

			onLogin: (event: Event) => {
				event.preventDefault();
				this.refs.submit.element?.focus();

				const fieldsValue: LoginRequestData = {};
				const signinFields: ['login', 'password'] = ['login', 'password'];

				signinFields.map((field) => {
					fieldsValue[field] = this.getRefsValue(field) as string;
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

				signin(fieldsValue as LoginReqData).catch((error) => this.refs.error.setProps({ error }));
			},

			navigate(event) {
				event?.preventDefault();
				Router.go('/sign-up');
			},
		});
	}

	protected init(): void {
		this.events = {
			submit: this.props.onLogin,
		};
	}
	protected render(): string {
		return `<form class='login__form'>
					{{{InputField label="Логин" name="login" type="text" ref="login" validate=validate.login}}}
					{{{InputField label="Пароль" name="password" type="password" ref="password" validate=validate.password}}}
					{{{ErrorBlock ref="error" }}}
					
					<div class="login__buttons-container ">
						{{{Button label="Авторизоваться" type="primary" ref='submit'}}}
						{{{Button label="Нет аккаунта?" type="secondary" onClick=navigate page="sign-up" }}}
					<div>
				</form>`;
	}
}
