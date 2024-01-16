import Block from '../../core/Block';
import { Props } from '../../core/core-env';

export class Message extends Block<Props> {
	protected render(): string {
		return `<div class='message message_{{kind}} message_content-{{type}}'>
                    {{#if image}}
                        <img src={{image}} class='message_image' alt='Изображение' />
                    {{/if}}
                
                    {{#if text}}
                        <div class='message__text'>{{text}}</div>
                    {{/if}}
                
                    <div class='message__date'>{{date}}</div>
                </div>`;
	}
}
