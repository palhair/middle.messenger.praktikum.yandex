import Block from '../../core/Block';
import { Props } from '../../core/core-env';

export interface FieldProps extends Props {
	name?: 'message' | 'search' | 'block';
	placeholder?: string;
}

export class Field extends Block<FieldProps> {
	constructor(props: FieldProps) {
		super({ ...props });
	}
	protected render(): string {
		return `<div class="field">
					<input class="field__{{name}}" type="text" name={{name}} {{#if placeholder}} placeholder={{placeholder}}{{/if}} />
				</div>`;
	}
}
