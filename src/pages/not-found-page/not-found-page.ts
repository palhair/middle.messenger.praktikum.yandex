import Block from '../../core/Block';
import { Props } from '../../core/core-env';
import notFoundPage from './not-found-page.hbs?raw';

export class NotFoundPage extends Block<Props> {
	protected render(): string {
		return notFoundPage;
	}
}
