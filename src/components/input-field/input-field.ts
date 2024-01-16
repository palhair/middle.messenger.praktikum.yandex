import Block from '../../core/Block';
import { Props } from '../../core/core-env';

export interface InputFieldProps extends Props {
	validate?: (value: string) => false | string;
}

export class InputField extends Block<InputFieldProps> {
	constructor(props: InputFieldProps) {
		super({
			...props,
			onBlur: () => this.validate(),
		});
	}

	public value() {
		if (!this.validate()) {
			return undefined;
		}
		if (
			this.refs.input instanceof Block &&
			this.refs.input.element instanceof HTMLInputElement
		) {
			return this.refs.input.element.value;
		}
	}

	validate() {
		if (
			this.refs.input instanceof Block &&
			this.refs.input.element instanceof HTMLInputElement
		) {
			const value = this.refs.input.element.value;
			let error;

			if (this.props.validate) {
				error = this.props.validate?.(value);
			}

			if (error) {
				this.setProps({ value: value, error });
				return false;
			}

			this.setProps({ error: undefined, value });
			return true;
		}
	}

	render(): string {
		this.getParams();
		return `<div class='input'>
					<label class='input__container input__container{{modificator}} '>
						{{{Input ${this.params} onBlur=onBlur ref='input'}}}
						
						<div class='input__label{{modificator}}'>{{label}}</div>
					</label>
					{{{ErrorBlock ${this.params}}}}
				</div>`;
	}
}
