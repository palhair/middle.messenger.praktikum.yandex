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
							lastMessageDate=this.lastMessageDate
							unreadMessage=this.unreadMessage
							name=this.name
							lastMessage=this.lastMessage
							avatar=this.avatar
							active=this.active
						}}}
					{{/each}}
				</ul>`;
	}
}
