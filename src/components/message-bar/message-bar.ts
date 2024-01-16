import Block from '../../core/Block';
import { Props } from '../../core/core-env';

import clip from '../../assets/clip.svg';
import arrow from '../../assets/arrow.svg';

export class MessageBar extends Block<Props> {
	constructor(props: Props) {
		super({
			...props,
			clip,
			arrow,
		});
	}
	protected render(): string {
		return `<form class="message-bar">
                    {{{ Button src=clip withIcon=true type="icon" alt="Прикрепить файл"}}}
                    {{{ Field name="message" type="text" placeholder=""}}}
                    {{{ Button src=arrow withIcon=true type="icon" alt='Отправить'}}}
                </form>`;
	}
}
