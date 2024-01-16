import Block from '../../core/Block';
import { Props } from '../../core/core-env';

interface ContactCardProps extends Props {}

export class ContactCard extends Block<ContactCardProps> {
	protected render(): string {
		return `<li class='contact-card {{#if active}}contact-card_active{{/if}}'>
					<div class='contact-card__contact-info'>
						<img class='contact-card__avatar' src="{{avatar}}" alt='ава {{name}}' />
						<div class='contact-card__container'>
							<div>{{name}}</div>
							<div class='contact-card__last-message'>{{lastMessage}}</div>
						</div>
					</div>
					<div class='contact-card__message-info'>
						<div>{{lastMessageDate}}</div>
						{{#if unreadMessage}}
							<div class='contact-card__unread-message'>
								{{unreadMessage}}</div>{{/if}}
					</div>
				</li>`;
	}
}
