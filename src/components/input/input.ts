import Block from '../../core/Block';
import sanitizeHtml from 'sanitize-html';

interface InputProps {
	type: string;
	name: string;
	placeholder: string;
	value: string;
	id: string;
	readonly: boolean;
	onBlur: (event: Event) => void;
}

type InputRefs = {
	input: HTMLInputElement;
};

export class Input extends Block<InputProps, InputRefs> {
	constructor(props: InputProps) {
		super({
			...props,
		});
	}

	public value() {
		const value = this.refs.input.value;
		return sanitizeHtml(value, {
			allowedTags: ['a', 'p', 'div'],
			allowedAttributes: { a: ['href'] },
		});
	}

	protected init(): void {
		this.events = {
			blur: this.props.onBlur,
		};
	}

	protected render(): string {
		return `<input
					class='input__element input__element{{modificator}} {{#if isError}}input__error{{/if}}'
					ref='input'
					type='{{type}}'
					name='{{name}}'
					{{#if id}} id="{{id}}" {{/if}}
					
					{{#if placeholder}} placeholder="{{placeholder}}"{{/if}}
					{{#if value}} value="{{value}}" {{/if}}
					{{#if readonly}} readonly {{/if}}
				/>`;
	}
}
