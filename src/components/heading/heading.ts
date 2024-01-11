import Block from '../../core/Block';
import heading from './heading.hbs?raw';

export class Heading extends Block {
	protected render(): string {
		console.log('render heading');
		return heading;
	}
}
