import Block from '../../core/Block';
import { Props } from '../../core/core-env';

export class Heading extends Block<Props> {
	protected render(): string {
		return `<{{type}} class="heading">{{label}}</{{type}}>`;
	}
}
