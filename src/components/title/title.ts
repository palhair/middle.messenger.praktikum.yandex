import Block from '../../core/Block';
import { Props } from '../../core/core-env';

export class Title extends Block<Props> {
	protected render(): string {
		return '<{{type}} class="title">{{label}}</{{type}}>';
	}
}
