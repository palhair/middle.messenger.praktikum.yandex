import loginPage from './login.hbs?raw';
import Block from '../../core/Block';
import * as validators from '../../utils/validators';
import { InputField } from '../../components';

type Props = Record<string, unknown>;

export class ProfilePage extends Block<Props> {
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
		return `<div class="container">
					<div class="profile__back">
						{{> Button src=arrow withIcon=true type="icon" alt="Назад"}}
					</div>
					<div class="profile__container">
						<div class="profile__header">
							{{> Avatar src=defaultAvatar alt="Поменять аватар" size="big"}}
							{{> Heading label="Иван" type="h1"}}
						</div>
						<div class="profile__info-block">
							{{> InfoItems readonly=false}}
						</div>
						<div class="profile__footer-block">
							{{> Button type="secondary" label='Изменить данные'}}
							{{> Button type="secondary" label='Изменить пароль'}}
							{{> Button type="error" label='выйти'}}
						</div>
					</div>
				</div>`;
	}
}
