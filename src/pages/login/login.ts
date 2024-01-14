import loginPage from './login.hbs?raw';
import Block from '../../core/Block';
import * as validators from '../../utils/validators';

type Props = Record<string, unknown>;
export class LoginPage extends Block {
	constructor(props: Props) {
		super({
			...props,
			validate: {
				login: validators.login,
			},
			events: {
				blur: () => console.log('on cblur'),
			},
		});
	}
	validate(event: Event) {
		const target = event.target as HTMLElement;
		console.log(target);
	}
	protected render(): string {
		return loginPage;
	}
}
