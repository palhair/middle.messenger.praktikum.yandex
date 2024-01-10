import { nanoid } from 'nanoid';
import EventBus from './EventsBus';
import { EventsNames, Children } from './core-env.d';

type Props = Record<string, unknown>;
type Refs = Record<string, Element | Block>;

export default class Block {
	public id = nanoid(6);
	protected props: Props;
	protected refs: Refs = {};
	private eventBus: EventBus;
	#element: HTMLElement | null = null;

	constructor(props: Props = {}) {
		this.props = this._makeProxyProps(props);
		this.eventBus = new EventBus();
		this._registerEvents(this.eventBus);
		this.eventBus.emit(EventsNames.INIT);
	}

	_registerEvents(eventBus: EventBus) {
		eventBus.on(EventsNames.INIT, this.#init.bind(this));
		eventBus.on(EventsNames.FLOW_RENDER, this.#render.bind(this));
	}

	#init() {
		this.init();
		this.eventBus.emit(EventsNames.FLOW_RENDER);
	}

	protected init() {}

	#render() {
		const fragment = this.compile(this.render(), this.props);
		const newElement = fragment.firstElementChild as HTMLElement;
		if (this.#element) {
			this.#element.replaceWith(newElement);
		}
		this.#element = newElement;
	}

	private compile(template: string, context: Props) {
		const contextAndStubs: Record<string, unknown> = { ...context, __refs: this.refs };

		const html = Handlebars.compile(template)(contextAndStubs);
		const temp = document.createElement('template');
		temp.innerHTML = html;

		if (Array.isArray(contextAndStubs.__children)) {
			contextAndStubs.__children?.forEach(({ embed }: Children) => {
				embed(temp.content);
			});
		}
		return temp.content;
	}

	protected render(): string {
		return '';
	}

	_makeProxyProps(props: Props) {
		return new Proxy(props, {
			get(target, prop: string) {
				const value = target[prop];
				return typeof value === 'function' ? value.bind(target) : value;
			},
			set(target, prop: string, value, reciver): boolean {
				const oldTarget = { ...target };
				target[prop] = value;

				reciver.eventBus.emit(EventsNames.FLOW_CDU, oldTarget, target);
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
					// this.dispatchComponentDidMount();
				}
			}, 100);
		}
		return this.#element;
	}
}
