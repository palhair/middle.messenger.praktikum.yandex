import Block from '../../core/Block';
import input from './input.hbs?raw';

type Props = Record<string, unknown>;
export class Input extends Block {
	constructor(props: Props) {
		super({
			...props,
			events: {
				onBlur: () => this.validate(),
			},
		});
	}

	validate() {
		console.log('df');
		console.log(this.refs.input);
	}
	protected render(): string {
		return input;
	}
}
