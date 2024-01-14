import Block from '../../core/Block';

type Props = Record<string, unknown>;
export class InputField extends Block {
	constructor(props: Props) {
		super({
			...props,
			onBlur: (event: Event) => this.test(event),
		});
	}
	test(event: Event) {
		const value = this.refs.input.element.value;
		console.log(value);
		const isError = this.props.validate?.(value);
		if (isError) {
			this.setProps({ isError, value: value, error: isError });
			return false;
		}
		this.setProps({ isError: undefined, value });
		return true;
	}
	render(): string {
		this.getParams();
		console.log(this.params);
		return `<div class='input'>
					<label class='input__container input__container{{modificator}} '>
						{{{Input ${this.params} onBlur=onBlur ref='input'}}}
						
						<div class='input__label{{modificator}}'>{{label}}</div>
					</label>
					{{#if isError}}<div class='input__error-text'>{{error}}</div>{{/if}}
				</div>`;
	}
}
