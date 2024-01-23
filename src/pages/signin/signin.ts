import signinPage from './signin.hbs?raw';
import Block from '../../core/Block';
import * as validators from '../../utils/validators';
import { Props } from '../../core/core-env';
// import { navigate } from '../../core/navigate';

export class SigninPage extends Block<Props> {
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

			onLogin: (event: Event) => {
				event.preventDefault();
				const fieldsValue: Record<string, undefined | string> = {};
				const signinFields = ['login', 'password', 'password_again', 'email', 'first_name', 'second_name', 'phone'];

				// можно сделать через Object.key(this.refs), но надо будет фильтровать принадлежность к InputField
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
				// navigate('profile');
			},
		});
	}

	protected render(): string {
		return signinPage;
	}
}
