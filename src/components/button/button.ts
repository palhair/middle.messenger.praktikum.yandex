import Block from '../../core/Block';
import { Props } from '../../core/core-env';

export interface ButtonProps {
	type: 'primary' | 'secondary' | 'withIcon' | 'error';
	label: string;
	src: string;
	alt: string;
}

export class Button extends Block<Props> {
	constructor(props: Props) {
		super(props);
	}
	protected init(): void {
		this.props.events = {
			click: this.props.onClick,
		};
	}
	protected render(): string {
		return `<button class='button button_{{type}}'>{{label}}
					{{#if withIcon}}
						<img src="{{src}}" class="button__images" alt="{{alt}}" />
					{{/if}}
				</button>`;
	}
}
