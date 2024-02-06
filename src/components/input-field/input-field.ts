import { Input } from '..';
import Block from '../../core/Block';
import { Props } from '../../core/core-env';

export interface InputFieldProps extends Props {}
type InputFieldRefs = {
	input: Input;
};

export class InputField extends Block<InputFieldProps, InputFieldRefs> {
	constructor(props: InputFieldProps) {
		super({
			...props,
			onBlur: () => {
				this.validate();
			},
		});
	}

	disableBlur() {
		this.setProps({ onBlur: undefined });
	}

	public value() {
		if (!this.validate()) {
			return null;
		}
		return this.refs.input.value();
	}

	public file() {
		const element = this.refs.input.element as HTMLInputElement;
		if (this.props.type == 'file' && element) {
			if (element.files) return element.files[0];
		}
	}

	validate() {
		if (this.props.type == 'file') {
			return true;
		}

		if (this.refs.input instanceof Block && this.refs.input.element instanceof HTMLInputElement) {
			const value = this.refs.input.value();
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
						{{{Input ${this.params} readonly=readonly onBlur=onBlur ref='input'}}}
						
						<div class='input__label{{modificator}}'>{{label}}</div>
					</label>
					{{{ErrorBlock ${this.params}}}}
				</div>`;
	}
}
