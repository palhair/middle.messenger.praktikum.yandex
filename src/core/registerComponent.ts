import { HelperOptions } from 'handlebars';
import Handlebars from 'handlebars';
import Block from './Block';

interface BlockConstructable<Props extends object, R extends {}> {
	new (props: Props): Block<Props, R>;
}

export function registerComponent<Props extends object, R extends {}>(
	name: string,
	Component: BlockConstructable<Props, R>
): void {
	if (name in Handlebars.helpers) {
		throw new Error(`${name} уже зарегистрирован`);
	}

	Handlebars.registerHelper(name, function (this: unknown, { hash, data, fn }: HelperOptions) {
		const component = new Component(hash);
		const dataAtribute = `data-id="${component.id}"`;

		if ('ref' in hash) {
			data.root.__refs[hash.ref] = component;
		}

		data.root.__children.push({
			component,
			embed(fragment: DocumentFragment) {
				const stub = fragment.querySelector(`[${dataAtribute}]`);
				if (!stub) {
					return;
				}

				component.getContent()?.append(...Array.from(stub.childNodes));
				stub.replaceWith(component.getContent()!);
			},
		});

		const contents = fn ? fn(this) : '';

		return `<div ${dataAtribute}>${contents}</div>`;
	});
}
