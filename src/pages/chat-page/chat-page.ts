import Block from '../../core/Block';
import chatPage from './chat-page.hbs?raw';
import larger from '../../assets/larger.svg';
import avatar from '../../assets/5.png';
import dots from '../../assets/dots.svg';
import clip from '../../assets/clip.svg';
import arrow from '../../assets/arrow.svg';
import { connect } from '../../utils/connect';
import { getUser } from '../../services/auth';
import { getWSUrl } from '../../utils/getWsUrl';
import { CreateWS, WsEvents } from '../../core/Websocket';
import { Chat, User } from '../../api/type';
import { CreateDialog } from '../../components/create-dialog/create-dialog';
import { Avatar, ChatDropdown, MessageBar, Title } from '../../components';
import { DisplayMessage, MessageType } from '../../type';
import { ListMessages } from '../../components/list-messages/list-messages';
import { Router } from '../../core/Router';
import { PageName } from '../../core/core-env.d';
import { initChatPage } from '../../services/initApp';

interface ChatPageProps {
	chats: Chat[];
	onSend: (event: Event) => void;
	larger: string;
	avatar: string;
	dots: string;
	arrow: string;
	clip: string;
	dialog: () => CreateDialog;
	currentChat: () => Chat | null;
	showMenu: (event: Event) => void;
	goProfile: (event: Event) => void;
	user: User;
}

type ChatPageRefs = {
	currentDialog: CreateDialog;
	chatTitle: Title;
	userControl: ChatDropdown;
	message: MessageBar;
	listMessages: ListMessages;
	currentChatAvatar: Avatar;
};
export class ChatPage extends Block<ChatPageProps, ChatPageRefs> {
	#webSocket: CreateWS | null = null;
	#currentChat: Chat | null = null;
	#currentChatMessages: DisplayMessage[] = [];

	constructor(props: ChatPageProps) {
		super({
			...props,
			larger: larger,
			avatar,
			dots,
			arrow,
			clip,

			dialog: () => this.getDialog(),
			currentChat: () => this.#currentChat,

			onSend: (event: Event) => {
				event.preventDefault();
				if (this.#currentChat) this.sendMessage();
			},
			showMenu: (event: Event) => {
				event.preventDefault();
			},
			goProfile: (event: Event) => {
				event.preventDefault();
				Router.go(PageName.Profile);
			},
		});
	}

	protected async init(): Promise<void> {
		this.events = {
			click: (event: Event) => {
				this.selectChat(event);
			},
		};
		const user = await initChatPage();
		if (user) this.props.user = user;
	}

	sendMessage() {
		const message = this.refs.message.value();
		if (!message) {
			return;
		}

		this.#webSocket?.send({
			content: message,
			type: 'message',
		});

		this.#currentChatMessages.push({
			kind: 'outgoing',
			type: 'text',
			date: new Date().toLocaleTimeString(),
			text: message,
		});
		this.refs.listMessages.setProps({ messages: this.#currentChatMessages });
	}

	getMessage(data: MessageType) {
		if (data.user_id == this.props.user.id) {
			return;
		}

		if (Array.isArray(data)) {
			data.reverse().forEach((item) => {
				this.printMessage(item);
			});
		} else this.printMessage(data);
	}

	printMessage(data: MessageType) {
		if (this.#currentChat === null) return;

		let kind = 'incoming';
		if (data.user_id == this.props.user.id) {
			kind = 'outgoing';
		}

		this.#currentChatMessages.push({
			kind,
			type: 'text',
			date: new Date(data.time).toLocaleTimeString(),
			text: data.content,
		});

		this.refs.listMessages.setProps({ messages: this.#currentChatMessages });
	}

	async getOldMessage() {
		this.#webSocket?.send({
			content: 0,
			type: 'get old',
		});
	}

	getDialog() {
		return this.refs.currentDialog;
	}

	selectChat(event: Event) {
		const target = event.target as HTMLElement;
		let chatId: number;
		if (target.closest('li')) {
			const li = target.closest('li');
			const chatIdstring = li?.dataset.id;

			if (chatIdstring) {
				chatId = parseInt(chatIdstring);
			} else {
				return;
			}
		} else {
			return;
		}

		const currentChat = this.props.chats.find((chat: Chat) => {
			return chat.id == chatId;
		});

		if (currentChat) {
			const chatBlock: HTMLElement | null = document.querySelector('.chat-page__chat-block');
			if (chatBlock) {
				chatBlock.style.display = 'block';
			}
			this.#currentChat = currentChat;
			this.#currentChatMessages = [];

			this.refs.chatTitle.setProps({ label: this.#currentChat.title });
			this.refs.currentChatAvatar.setProps({ src: this.#currentChat.avatar });
			this.refs.listMessages.setProps({ messages: this.#currentChatMessages });

			this.openWS(this.#currentChat);
		}
	}

	async openWS(currentChat: Chat) {
		if (this.#webSocket && this.#webSocket.id !== currentChat.id) {
			this.#webSocket.close();
		}

		const user = await getUser();
		const url = await getWSUrl(user, currentChat.id);

		if (!this.#webSocket) {
			this.#webSocket = new CreateWS(url);
			this.#webSocket.id = currentChat.id;

			this.#webSocket.connect();
			this.#webSocket.on(WsEvents.CLOSE, () => {
				this.#webSocket = null;
			});

			this.#webSocket.on(WsEvents.MESSAGE, this.getMessage.bind(this));
			this.#webSocket.on(WsEvents.CONNECTED, () => this.getOldMessage());
		}
	}

	protected render(): string {
		return chatPage;
	}
}
export default connect(({ chats }) => ({ chats }))(ChatPage);
