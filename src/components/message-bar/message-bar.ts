import Block from '../../core/Block';
import { Props } from '../../core/core-env';
import * as validators from '../../utils/validators';

export class MessageBar extends Block<Props> {
	constructor(props: Props) {
		super({
			...props,

			validate: validators.message,
			onBlur: () => this.validate(),
		});
	}

	public value() {
		if (!this.validate()) {
			return undefined;
		}
		if (this.refs.input instanceof Block && this.refs.input.element instanceof HTMLInputElement) {
			return this.refs.input.element.value;
		}
	}

	validate() {
		if (this.refs.input instanceof Block && this.refs.input.element instanceof HTMLInputElement) {
			const value = this.refs.input.element.value;
			let error;

			if (this.props.validate) {
				error = this.props.validate?.(value);
			}

			if (error) {
				this.setProps({ value: value, error });
				console.log(error);

				return false;
			}

			this.setProps({ value });
			return true;
		}
	}
	protected render(): string {
		this.getParams();

		return `<div class="field">
					{{{Input ${this.params}  modificator="_message"  type="textarea" name="message" onBlur=onBlur ref="input" }}}
				</div>`;
	}
}
