import Block from '../../core/Block';
import authForm from './authForm.hbs?raw';

export class AuthForm extends Block {
	protected render(): string {
		console.log('render authform');
		return authForm;
	}
}
