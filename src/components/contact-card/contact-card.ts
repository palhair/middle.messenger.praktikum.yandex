import Block from '../../core/Block';

interface ContactCardProps {
	active: boolean;
	avatar: string | null;
	name: string;
	lastMessage: string | null;
	unreadMessage: number;
	id: number;
	lastMessageDate: string;
}

export class ContactCard extends Block<ContactCardProps> {
	init() {
		if (this.props.lastMessageDate) {
			const time = this.props.lastMessageDate;
			const lastMessageDate = new Date(time).toLocaleTimeString();
			this.setProps({ lastMessageDate });
		}
	}
	protected render(): string {
		return `<li class='contact-card  {{#if active}}contact-card_active{{/if}}' data-id={{id}}>
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
