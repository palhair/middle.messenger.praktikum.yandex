import Block from '../../core/Block';
import chatPage from './chat-page.hbs?raw';
import { Props } from '../../core/core-env';
import larger from '../../assets/larger.svg';
import avatar from '../../assets/5.png';
import dots from '../../assets/dots.svg';
import { contacts } from '.';
import { messages } from '.';
import clip from '../../assets/clip.svg';
import arrow from '../../assets/arrow.svg';
import { connect } from '../../utils/connect';

interface ChatPageProps extends Props {}

export class ChatPage extends Block<ChatPageProps> {
	constructor(props: ChatPageProps) {
		super({
			...props,
			larger: larger,
			contacts,
			avatar,
			dots,
			messages,
			arrow,
			clip,

			onSend: (event: Event) => {
				event.preventDefault();
				const message = this.getRefsValue('message');
				if (!message) {
					return;
				}
				console.log(message);
			},
		});
		console.log('init chatPage');
	}
	protected render(): string {
		return chatPage;
	}
}
export default connect(({ chats, user }) => ({ chats, user }))(ChatPage);
