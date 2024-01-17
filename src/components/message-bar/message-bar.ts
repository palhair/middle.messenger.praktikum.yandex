import Block from '../../core/Block';
import { Props } from '../../core/core-env';
import * as validators from '../../utils/validators';

import clip from '../../assets/clip.svg';
import arrow from '../../assets/arrow.svg';

export class MessageBar extends Block<Props> {
	constructor(props: Props) {
		super({
			...props,
			validate: {
				message: validators.message,
			},
			clip,
			arrow,
			onSend: (event: Event) => {
				event.preventDefault();
				const message = this.getRefsValue('message');
				console.log(message);
			},
		});
	}
	protected render(): string {
		const { onSend } = this.props;
		return `<form class="message-bar">
                    {{{ Button src=clip withIcon=true type="icon" alt="Прикрепить файл" onclick=addFile}}}
                    {{{ Field name="_message" type="text" placeholder="" ref="message" validate=validate.message}}}
                    {{{ Button src=arrow withIcon=true type="icon" alt='Отправить' onClick=onSend}}}
                </form>`;
	}
}
