import signinPage from './signin.hbs?raw';
import Block from '../../core/Block';
import * as validators from '../../utils/validators';
import { PageName, Props } from '../../core/core-env.d';
import { signup } from '../../services/auth';
import { CreateUser } from '../../api/type';
import { ErrorBlock } from '../../components';
import { Router } from '../../core/Router';

type Refs = {
	error: ErrorBlock;
};
export class SigninPage extends Block<Props, Refs> {
	constructor(props: Props) {
		super({
			...props,
			validate: {
				login: validators.login,
				password: validators.password,
				email: validators.email,
				name: validators.name,
				phone: validators.phone,
				password_again: (pass: string) => this.passAgainCheck(pass),
			},

			onRegistration: (event: Event) => {
				event.preventDefault();
				const fieldsValue: Record<string, undefined | string> = {};
				const signinFields = ['login', 'password', 'password_again', 'email', 'first_name', 'second_name', 'phone'];

				signinFields.map((field) => {
					fieldsValue[field] = this.getRefsValue(field);
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

	protected render(): string {
		return signinPage;
	}
}
