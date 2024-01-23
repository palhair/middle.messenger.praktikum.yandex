import Block from './Block';
import { BlockConstructable, TProps, RefType } from './core-env';

interface RouteProps extends TProps {
	rootQuyery: string;
}

export class Route<Props extends RouteProps = RouteProps, R extends RefType = {}> {
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
			render(this.#props.rootQuyery, this.#block);
		}
		this.#block.show();
	}
}

function isEqual(lhs: string, rhs: string) {
	return lhs === rhs;
}

function render(query: string, block: Block<TProps>) {
	// Перенести в Роут
	const root = document.querySelector(query);
	root?.append(block.getContent() as HTMLElement);
}
