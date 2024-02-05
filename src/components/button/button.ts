import Block from '../../core/Block';

export interface ButtonProps {
	type: 'primary' | 'secondary' | 'withIcon' | 'error';
	page: string;
	label: string;
	src: string;
	alt: string;
	onClick: (e: Event) => void;
}

export class Button extends Block<ButtonProps> {
	constructor(props: ButtonProps) {
		super(props);
	}
	protected init(): void {
		this.events = {
			click: this.props.onClick,
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
