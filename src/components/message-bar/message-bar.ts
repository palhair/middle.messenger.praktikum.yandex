import Block from '../../core/Block';
import { Props } from '../../core/core-env';
import * as validators from '../../utils/validators';

import clip from '../../assets/clip.svg';
import arrow from '../../assets/arrow.svg';

export class MessageBar extends Block<Props> {
	constructor(props: Props) {
		super({
			...props,
			validate: validators.message,

			clip,
			arrow,
			onBlur: () => this.validate(),
			onSend: (event: Event) => {
				event.preventDefault();
				const message = this.getRefsValue('message');
				console.log(message);
			},
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
		console.log('error');

		if (this.refs.input instanceof Block && this.refs.input.element instanceof HTMLInputElement) {
			const value = this.refs.input.element.value;
			let error;

			if (this.props.validate) {
				error = this.props.validate?.(value);
				console.log(error);
			}

			if (error) {
				this.setProps({ value: value, error });
				return false;
			}

			this.setProps({ error: undefined, value });
			return true;
		}
	}
	protected render(): string {
		return `<form class="message-bar">
                    {{{ Button src=clip withIcon=true type="icon" alt="Прикрепить файл" onclick=addFile}}}
						<div class="field">
							{{{Input modificator="_message"  type="text" name="message" onBlur=onBlur ref="message" validate="validate"}}}
						</div>
                    {{{ Button src=arrow withIcon=true type="icon" alt='Отправить' onClick=onSend}}}
                </form>`;
	}
}
