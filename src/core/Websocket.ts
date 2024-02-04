import EventBus from './EventsBus';

export enum WsEvents {
	CONNECTED = 'open',
	CLOSE = 'close',
	ERROR = 'error',
	MESSAGE = 'message',
}

export class CreateWS extends EventBus {
	#socket?: WebSocket;
	#url: string;
	id: number | null = null;
	#pingInterval?: ReturnType<typeof setInterval>;
	readonly pingIntervalTime = 30000;

	constructor(url: string) {
		super();
		this.#url = url;
	}
	send(data: string | object | number) {
		if (!this.#socket) {
			throw new Error('Socket is no connected');
		}
		this.#socket.send(JSON.stringify(data));
	}

	connect(): Promise<void> {
		if (this.#socket) {
			throw new Error('Websocket is already open');
		}

		this.#socket = new WebSocket(this.#url);
		this.#subscribe(this.#socket);
		this.#setupPing();

		return new Promise((resolve, reject) => {
			this.on(WsEvents.ERROR, reject);
			this.on(WsEvents.CONNECTED, () => {
				this.off(WsEvents.ERROR, reject);
				resolve();
			});
		});
	}

	#setupPing() {
		this.#pingInterval = setInterval(() => {
			this.send({ type: 'ping' });
		}, this.pingIntervalTime);

		this.on(WsEvents.CLOSE, () => {
			clearInterval(this.#pingInterval);
			this.#pingInterval = undefined;
		});
	}

	#subscribe(socket: WebSocket) {
		socket.addEventListener('open', () => {
			console.log(`Соединение установлено! ${new Date().toLocaleTimeString()}`);
			this.emit(WsEvents.CONNECTED);
		});
		socket.addEventListener('close', () => {
			console.log(`Соединение закрыто! ${new Date().toLocaleTimeString()}`);
			this.emit(WsEvents.CLOSE);
		});
		socket.addEventListener('error', () => {
			this.emit(WsEvents.ERROR);
		});
		socket.addEventListener('message', (message: MessageEvent<any>) => {
			try {
				const data = JSON.parse(message.data);
				if (['pong', 'user connected'].includes(data?.type)) {
					return;
				}

				this.emit(WsEvents.MESSAGE, data);
			} catch (e) {}
		});
	}

	close() {
		if (!this.#socket) {
			throw new Error('Websocket is undefindet');
		}
		this.#socket?.close();
	}
}
