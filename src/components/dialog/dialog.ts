import Block from '../../core/Block';

interface DialogProps {
	open: boolean;
}

export class Dialog extends Block<DialogProps> {
	protected render(): string {
		return `<dialog class="dialog" {{#if open}}open{{/if}} ></dialog>`;
	}
}
