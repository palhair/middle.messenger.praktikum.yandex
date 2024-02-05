import loginPage from './login.hbs?raw';
import Block from '../../core/Block';
import * as validators from '../../utils/validators';
import { Router } from '../../core/Router';
import { signin } from '../../services/auth';
import { LoginReqData } from '../../api/type';
import { ErrorBlock, InputField } from '../../components';
import { TProps } from '../../core/core-env';
import { initApp } from '../../services/initApp';

type LoginRequestData = {
	login?: string;
	password?: string;
};

export interface IProps extends TProps {
	validate: {
		login: (value: string) => boolean | string;
		password: (value: string) => boolean | string;
	};
	onLogin: (e: Event) => void;
	onRegistration: (e: Event) => void;
	events?: {};
	error: string | null;
	navigate: (e: Event) => void;
}

type Refs = {
	login: InputField;
	password: InputField;
	error: ErrorBlock;
};

export class LoginPage extends Block<IProps, Refs> {
	constructor(props: IProps) {
		super({
			...props,
			validate: {
				login: validators.login,
				password: validators.password,
			},

			onLogin: (event: Event) => {
				event.preventDefault();

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

	protected async init(): Promise<void> {
		await initApp();
	}

	protected render(): string {
		return loginPage;
	}
}
