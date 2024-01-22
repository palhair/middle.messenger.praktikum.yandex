import Block, { Object } from './Block';
import { BlockConstructable } from './core-env';

export class Route<Props extends object, R extends {}> {
	#pathname;
	#blockClass;
	#block: Block<Props> | null = null;
	#props;
	constructor(pathname: string, view: BlockConstructable<Props, R>, props: Props) {
		this.#pathname = pathname;
		this.#blockClass = view;
		this.#props = props;
	}

	navigate(pathname: string) {
		if (this.match(pathname)) {
			this.#pathname = pathname;
			this.render();
		}
	}

	leave() {
		if (this.#block) {
			this.#block.hide();
		}
	}

	match(pathname: string) {
		return isEqual(pathname, this.#pathname);
	}

	render() {
		if (!this.#block) {
			this.#block = new this.#blockClass(this.#props);
			render(this.#pathname, this.#block);
		}
		this.#block.show();
	}
}

function isEqual(lhs: string, rhs: string) {
	return lhs === rhs;
}

function render(query: string, block: Block<Object>) {
	// Перенести в Роут
	const root = document.querySelector(query);
	root?.append(block.getContent() as HTMLElement);
}
