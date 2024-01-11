import loginPage from './login.hbs?raw';
import Block from '../../core/Block';

export class LoginPage extends Block {
	constructor() {
		super();
	}

	protected render(): string {
		return loginPage;
	}
}
