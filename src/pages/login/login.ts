import loginPage from './login.hbs?raw';
import Block from '../../core/Block';
import * as validators from '../../utils/validators';
import { InputField } from '../../components';
import { navigate, navigateEvent } from '../../core/navigate';
import { Props } from '../../core/core-env';

export class LoginPage extends Block<Props> {
	constructor(props: Props) {
		super({
			...props,
			validate: {
				login: validators.login,
				password: validators.password,
			},

			navigate: navigateEvent,
			onLogin: (event: Event) => {
				event.preventDefault();

				const fieldsValue: Record<string, undefined | string> = {};
				const signinFields = ['login', 'password'];

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

				console.log(fieldsValue);
				navigate('chatPage');
			},
		});
	}

	getRefsValue(name: string) {
		const element = this.refs[name];
		if (element instanceof InputField) {
			return element.value();
		}
	}

	protected render(): string {
		return loginPage;
	}
}
