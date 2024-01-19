import Block from '../../core/Block';
import { Props } from '../../core/core-env';

export class ErrorBlock extends Block<Props> {
	protected render(): string {
		const { modificator } = this.props;
		return `<div class="input__error-text ${modificator ? `input__error-text${modificator}` : ''}">{{error}}</div>`;
	}
}
