import { nanoid } from 'nanoid';
import Handlebars from 'handlebars';
import EventBus from './EventsBus';
import { EventsNames, Child } from './core-env.d';

// type BlockProps = Record<string, unknown>;
export type RefType = Record<string, Element | Block<object>>;

// export interface BlockClass<P extends object, R extends RefType> extends Function{
// 	new (props: P): Block<P, R>;
// 	componentName?: string;
// }

export default class Block<Props extends object, Refs extends RefType = RefType> {
	public id = nanoid(6);
	params: string = '';
	protected props: Props;
	protected children: Child[] = [];
	protected refs: Refs = {} as Refs;
	private eventBus: () => EventBus;
	#element: HTMLElement | null = null;

	constructor(props: Props = {} as Props) {
		const eventBus = new EventBus();

		this.props = this.#makeProxyProps(props);
		this.eventBus = () => eventBus;
		this._registerEvents(eventBus);
		this.eventBus().emit(EventsNames.INIT);
	}

	_registerEvents(eventBus: EventBus) {
		eventBus.on(EventsNames.INIT, this.#init.bind(this));
		eventBus.on(EventsNames.FLOW_CDM, this.#componentDidMount.bind(this));
		eventBus.on(EventsNames.FLOW_CDU, this.#componentDidUpdate.bind(this));
		eventBus.on(EventsNames.FLOW_CWU, this.#componentWillUnmount.bind(this));
		eventBus.on(EventsNames.FLOW_RENDER, this.#render.bind(this));
	}

	#init() {
		this.init();
		this.getParams();
		this.eventBus().emit(EventsNames.FLOW_RENDER);
	}

	protected init() {}

	#componentDidUpdate(oldProps: unknown, newProps: unknown) {
		if (this.componentDidUpdate(oldProps, newProps)) {
			this.eventBus().emit(EventsNames.FLOW_RENDER);
		}
	}

	protected componentDidUpdate(_oldProps: unknown, _newProps: unknown) {
		return true;
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

	_addEvents() {
		const { events = {} } = this.props;

		Object.keys(events).forEach((eventName) => {
			this.#element!.addEventListener(eventName, events[eventName]);
		});
		// if (this.props.events) {
		// 	const events: Events = this.props.events as Events;

		// 	Object.keys(events).forEach((eventName) => {
		// 		this.#element!.addEventListener(eventName, events[eventName]);
		// 	});
		// }
	}

	protected render(): string {
		return '';
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	#makeProxyProps(props: any) {
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		const self = this;
		return new Proxy(props, {
			get(target, prop) {
				const value = target[prop];
				return typeof value === 'function' ? value.bind(target) : value;
			},
			set(target, prop: string, value): boolean {
				const oldTarget = { ...target };
				target[prop] = value;
				self.eventBus().emit(EventsNames.FLOW_CDU, oldTarget, target);
				return true;
			},
			deleteProperty() {
				throw new Error('Отказано в доступе!');
			},
		});
	}

	getContent() {
		if (this.#element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
			setTimeout(() => {
				if (this.#element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
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
		this.eventBus().emit(EventsNames.FLOW_CDM);

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
		this.eventBus().emit(EventsNames.FLOW_CWU, this.props);
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
			this.params += ` ${key} = "${value}"`;
		});
		return this.params;
	}

	show() {
		this.getContent()!.style.display = 'block';
	}

	hide() {
		this.getContent()!.style.display = 'none';
	}
}
