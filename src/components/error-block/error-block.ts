import Block from '../../core/Block';
import { Props } from '../../core/core-env';

export class ErrorBlock extends Block<Props> {
	protected render(): string {
		return '<div class="input__error-text">{{error}}</div>';
	}
}
