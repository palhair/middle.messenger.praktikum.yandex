import signinPage from './signin.hbs?raw';
import Block from '../../core/Block';
import { Props } from '../../core/core-env';
import { ErrorBlock } from '../../components';
type Refs = {
	error: ErrorBlock;
};
export class SigninPage extends Block<Props, Refs> {
	protected render(): string {
		return signinPage;
	}
}
