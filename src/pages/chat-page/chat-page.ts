import Block from '../../core/Block';
import chatPage from './chat-page.hbs?raw';
import { Props } from '../../core/core-env';
import larger from '../../assets/larger.svg';
import { contacts } from '.';

interface ChatPageProps extends Props {}

export class ChatPage extends Block<ChatPageProps> {
	constructor(props: ChatPageProps) {
		super({
			...props,
			larger: larger,
			contacts,
		});
	}
	protected render(): string {
		console.log(this.props);
		return chatPage;
	}
}
