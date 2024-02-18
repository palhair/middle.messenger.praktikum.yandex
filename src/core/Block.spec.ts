import { expect } from 'chai';
import sinon from 'sinon';
import Block from './Block';
import { registerComponent } from './registerComponent';

interface Props {
	text?: string;
	textButton?: string;
	events?: Record<string, () => void>;
	onClick?: EventListener;
}

type Refs = {};

describe('Block', () => {
	let PageClass: typeof Block<Props, Refs>;
	let ChildClass: typeof Block<Props, Refs>;

	before(() => {
		class ChildBlock extends Block<Props, Refs> {
			protected render(): string {
				return '<div id=\'child-block\'>{{text}}</div>';
			}
		}

		registerComponent('ChildBlock', ChildBlock);

		class Page extends Block<Props, Refs> {
			constructor(props: Props) {
				super({
					...props,
				});
			}
			protected init(): void {
				this.events = {
					click: this.props.onClick,
				};
			}

			protected render(): string {
				return `<div id='test-element'>
							<span id="test-text">{{text}}</span>
							<button>{{textButton}}</button>
						</div>`;
			}
		}

		PageClass = Page;
		ChildClass = ChildBlock;
	});

	it('Должен создать компонент с состоянием из конструктора', () => {
		const text = 'Hello';
		const pageComponent = new PageClass({ text });

		const spanText = pageComponent.element?.querySelector('#test-text')?.innerHTML;

		expect(spanText).to.be.eq(text);
	});

	it('Компонент должен иметь реактивное повдение', () => {
		const text = 'new value';
		const pageComponent = new PageClass({ text: 'Hello' });

		pageComponent.setProps({ text });
		const spanText = pageComponent.element?.querySelector('#test-text')?.innerHTML;

		expect(spanText).to.be.eq(text);
	});

	it('Компонент должен установить события на элемент', () => {
		const handlerStub = sinon.stub();
		const pageComponent = new PageClass({
			onClick: handlerStub,
		});

		const event = new MouseEvent('click');
		pageComponent.element?.dispatchEvent(event);

		expect(handlerStub.calledOnce).to.be.true;
	});

	it.skip('Компонент должен вызвать dispatchComponentDidMount метод', (done) => {
		const pageComponent = new PageClass();

		const spyCDM = sinon.spy(pageComponent, 'dispatchComponentDidMount');

		const element = pageComponent.getContent();
		document.body.appendChild(element!);
		setTimeout(() => {
			expect(spyCDM.calledOnce).to.be.true;
			done();
		}, 501);
	});

	it('Компонент добавляет дочерние блоки в свойство children', () => {
		class ParentBlock extends Block<Props, Refs> {
			getChildren() {
				return this.children;
			}
			protected render(): string {
				return `<div>
							{{{ChildBlock text="I'm child block №1"}}}
							{{{ChildBlock text="I'm child block №2"}}}
							{{{ChildBlock text="I'm child block №3"}}}
						</div>`;
			}
		}
		const parentComponent = new ParentBlock();
		const children = parentComponent.getChildren();

		expect(children).to.have.lengthOf(3);
	});

	it('Компонент передает параметры в дочерний элемент', () => {
		const text = 'I\'m child block';
		class ParentBlock extends Block<Props, Refs> {
			constructor(props: Props) {
				super({
					...props,
				});
			}

			protected render(): string {
				return `<div>
							{{{ChildBlock text=text}}}
						</div>`;
			}
		}

		const parentComponent = new ParentBlock({ text });
		const childText = parentComponent.element?.querySelector('#child-block')?.innerHTML;

		expect(childText).to.be.eq(text);
	});

	it('Компонент записывает в refs дочерний Блок', () => {
		type ParentRefs = Record<string, Element | Block<object>>;
		class ParentBlock extends Block<Props, ParentRefs> {
			getRefs() {
				return this.refs;
			}

			protected render(): string {
				return `<div>
							{{{ChildBlock ref='childBlock' text="I'm child block"}}}
						</div>`;
			}
		}

		const parentComponent = new ParentBlock();
		const childBlock = parentComponent.getRefs().childBlock;

		expect(childBlock).to.be.an.instanceof(ChildClass);
	});
});
