import { nanoid } from 'nanoid';
import Handlebars from 'handlebars';
import EventBus from './EventsBus';
import { EventsNames, Child } from './core-env.d';

type Props = Record<string, unknown>;
type Refs = Record<string, Element | Block>;
type Events = { [key: string]: (event: unknown) => void };

export default class Block {
	public id = nanoid(6);
	params: string = '';
	protected props: Props;
	protected children: Child[] = [];
	protected refs: Refs = {};
	private eventBus: EventBus;
	#element: HTMLElement | null = null;

	constructor(props: Props = {}) {
		this.props = this.#makeProxyProps(props);
		this.eventBus = new EventBus();
		this._registerEvents(this.eventBus);
		this.eventBus.emit(EventsNames.INIT);
	}

	_registerEvents(eventBus: EventBus) {
		eventBus.on(EventsNames.INIT, this.#init.bind(this));
		eventBus.on(EventsNames.FLOW_CDM, this.#componentDidMount.bind(this));
		eventBus.on(EventsNames.FLOW_CDU, this.#componentDidUpdate.bind(this));
		eventBus.on(
			EventsNames.FLOW_CWU,
			this.#componentWillUnmount.bind(this)
		);
		eventBus.on(EventsNames.FLOW_RENDER, this.#render.bind(this));
	}

	#init() {
		this.init();
		this.getParams();
		this.eventBus.emit(EventsNames.FLOW_RENDER);
	}

	protected init() {}

	#componentDidUpdate(oldProps: unknown, newProps: unknown) {
		if (this.componentDidUpdate(oldProps, newProps)) {
			this.eventBus.emit(EventsNames.FLOW_RENDER);
		}
	}

	protected componentDidUpdate(oldProps: unknown, newProps: unknown) {
		return oldProps != newProps;
	}

	#render() {
		const fragment = this.compile(this.render(), this.props);
		const newElement = fragment.firstElementChild as HTMLElement;
		if (this.#element) {
			this.#element.replaceWith(newElement);
		}
		this.#element = newElement;
		this._addEvents();

		// console.log(this.params);
	}

	_addEvents() {
		if (this.props.events) {
			const events: Events = this.props.events as Events;

			Object.keys(events).forEach((eventName) => {
				this.#element!.addEventListener(eventName, events[eventName]);
			});
		}
	}

	private compile(template: string, context: Props) {
		const contextAndStubs: Record<string, unknown> = {
			...context,
			__refs: this.refs,
			__children: this.children,
		};

		const html = Handlebars.compile(template)(contextAndStubs);
		const temp = document.createElement('template');
		temp.innerHTML = html;

		if (Array.isArray(contextAndStubs.__children)) {
			contextAndStubs.__children?.forEach(({ embed }: Child) => {
				embed(temp.content);
			});
		}
		return temp.content;
	}

	protected render(): string {
		return '';
	}

	#makeProxyProps(props: Props) {
		const self = this as Block;
		return new Proxy(props, {
			get(target, prop: string) {
				const value = target[prop];
				return typeof value === 'function' ? value.bind(target) : value;
			},
			set(target, prop: string, value): boolean {
				const oldTarget = { ...target };
				target[prop] = value;
				self.eventBus.emit(EventsNames.FLOW_CDU, oldTarget, target);
				return true;
			},
			deleteProperty() {
				throw new Error('Отказано в доступе!');
			},
		});
	}

	getContent() {
		if (
			this.#element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE
		) {
			setTimeout(() => {
				if (
					this.#element?.parentNode?.nodeType !==
					Node.DOCUMENT_FRAGMENT_NODE
				) {
					this.dispatchComponentDidMount();
				}
			}, 100);
		}
		return this.#element;
	}

	#componentDidMount() {
		this.#checkInDom();
		this.componentDidMount();
	}

	componentDidMount() {}

	setProps = (nextProps: Props) => {
		if (!nextProps) {
			return;
		}

		Object.assign(this.props, nextProps);
	};

	get element() {
		return this.#element;
	}

	dispatchComponentDidMount() {
		this.eventBus.emit(EventsNames.FLOW_CDM);
		Object.values(this.children).forEach((child) =>
			child.component.dispatchComponentDidMount()
		);
	}

	#checkInDom() {
		const elementInDom = document.body.contains(this.#element);
		if (elementInDom) {
			setTimeout(() => this.#checkInDom(), 1000);
			return;
		}
		this.eventBus.emit(EventsNames.FLOW_CWU);
	}

	#componentWillUnmount() {
		this.componentWillUnmount();
	}

	componentWillUnmount() {}

	getParams() {
		this.params = '';
		const props = Object.entries(this.props).filter(([key, value]) => {
			return key != 'events' && key != 'ref' && typeof value == 'string';
		});

		props.forEach(([key, value]) => {
			this.params += ` ${key} = '${value}'`;
		});
		return this.params;
	}
}
