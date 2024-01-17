import Block from '../../core/Block';
import { Props } from '../../core/core-env';
import errorPage from './error-page.hbs?raw';

export class ErrorPage extends Block<Props> {
	protected render(): string {
		return errorPage;
	}
}
