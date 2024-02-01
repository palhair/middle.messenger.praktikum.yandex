import Block from '../../core/Block';
import chatPage from './chat-page.hbs?raw';
import { Props } from '../../core/core-env';
import larger from '../../assets/larger.svg';
import avatar from '../../assets/5.png';
import dots from '../../assets/dots.svg';
import { messages } from '.';
import clip from '../../assets/clip.svg';
import arrow from '../../assets/arrow.svg';
import { connect } from '../../utils/connect';
import { getUser } from '../../services/auth';
import { getWSUrl } from '../../utils/getWsUrl';
import { CreateWS } from '../../core/Websocket';
import { cloneDeep } from '../../utils/cloneDeep';
import isEqual from '../../utils/isEqual';

interface ChatPageProps extends Props {}

export class ChatPage extends Block<ChatPageProps> {
	#webSocket: CreateWS | null = null;
	constructor(props: ChatPageProps) {
		super({
			...props,
			larger: larger,
			avatar,
			dots,
			messages,
			arrow,
			clip,

			dialog: () => this.getDialog(),

			onSend: (event: Event) => {
				event.preventDefault();
				this.sendMessage();
			},
			showMenu: (event: Event) => {
				event.preventDefault();
				console.log('showMenu');
			},
		});
	}

	sendMessage() {
		const message = this.getRefsValue('message');
		if (!message) {
			return;
		}

		this.#webSocket?.send({
			content: message,
			type: 'message',
		});

		const messages = window.store.getState().messages;
		const newMessages = cloneDeep(messages);
		newMessages.push({
			kind: 'outgoing',
			type: 'text',
			date: new Date().toLocaleTimeString(),
			text: message,
		});
		window.store.set({ messages: newMessages });
	}

	protected init(): void {
		this.events = {
			click: (event: Event) => {
				event.preventDefault();
				this.openWS(event);
			},
		};
	}

	getDialog() {
		return this.refs.currentDialog;
	}

	async openWS(event: Event) {
		const target = event.target as HTMLElement;
		let chatId;
		if (target.closest('li')) {
			const li = target.closest('li');
			chatId = li?.dataset.id;
			if (chatId) {
				chatId = parseInt(chatId);
			} else {
				return;
			}
		} else {
			return;
		}

		const user = await getUser();
		const url = await getWSUrl(user, chatId as number);
		this.#webSocket = new CreateWS(url);
		this.#webSocket.connect();
	}
	protected render(): string {
		return chatPage;
	}
}
export default connect(({ chats, user }) => ({ chats, user }))(ChatPage);
