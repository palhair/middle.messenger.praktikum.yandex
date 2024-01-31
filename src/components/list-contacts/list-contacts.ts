import Block from '../../core/Block';
import { Props } from '../../core/core-env';

export interface ListContactsProps extends Props {
	validate?: (value: string) => false | string;
}

export class ListContacts extends Block<ListContactsProps> {
	protected render(): string {
		return `<ul class='list-contacts'>
					{{#each contacts}}
						{{{ContactCard
							lastMessageDate=this.last_message
							unreadMessage=this.unread_count
							name=this.title
							lastMessage=this.last_message
							avatar=this.avatar
							active=this.active
						}}}
					{{/each}}
				</ul>`;
	}
}
