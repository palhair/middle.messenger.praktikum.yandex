import Block from '../../core/Block';
interface PartialBlockProps {}

export class PartialBlock extends Block<PartialBlockProps> {
	protected render(): string {
		return `<form class={{login__form}}></form>`;
	}
}
