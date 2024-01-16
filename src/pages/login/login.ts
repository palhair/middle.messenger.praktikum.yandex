import loginPage from './login.hbs?raw';
import Block from '../../core/Block';
import * as validators from '../../utils/validators';
import { InputField } from '../../components';

type Props = Record<string, unknown>;
export class LoginPage extends Block<Props> {
	constructor(props: Props) {
		super({
			...props,
			validate: {
				login: validators.login,
				password: validators.password,
			},

			onLogin: (event: Event) => {
				event.preventDefault();
				if (
					this.refs.login instanceof InputField &&
					this.refs.password instanceof InputField
				) {
					const login = this.refs.login.value();
					const password = this.refs.password.value();

					if (!login && !password) {
						return;
					}

					console.log({ login, password });
				}
			},
		});
	}

	protected render(): string {
		return loginPage;
	}
}
