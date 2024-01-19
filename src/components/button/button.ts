import Block from '../../core/Block';
import { Props } from '../../core/core-env';

export interface ButtonProps {
	type: 'primary' | 'secondary' | 'withIcon' | 'error';
	label: string;
	src: string;
	alt: string;
	events: { [key: string]: Event };
	onClick: Event;
}

export class Button extends Block<Props> {
	constructor(props: Props) {
		super(props);
	}
	protected init(): void {
		this.props.events = {
			click: this.props.onClick,
		};

		this.events = {
			click: this.props.events.click,
		};
	}

	protected render(): string {
		const { page } = this.props;
		return `<button class='button button_{{type}}'  ${page ? `page="${page}"` : ''}>{{label}}
					{{#if withIcon}}
						<img src="{{src}}" class="button__images" alt="{{alt}}" />
					{{/if}}
				</button>`;
	}
}
