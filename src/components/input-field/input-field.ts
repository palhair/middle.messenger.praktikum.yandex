import { ErrorBlock, Input } from '..';
import Block from '../../core/Block';
import { Validator } from '../../utils/validators';

export interface InputFieldProps {
	type: string;
	onBlur: EventListener;
	validate: Validator;
	value: string;
	error: undefined | boolean | string;
}
type InputFieldRefs = {
	input: Input;
	error: ErrorBlock;
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
				this.refs.error.setProps({ error: error });
				// this.setProps({ value: value, error });
				return false;
			}
			this.refs.error.setProps({ error: undefined });
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
					{{{ErrorBlock ${this.params} ref='error'}}}
				</div>`;
	}
}
