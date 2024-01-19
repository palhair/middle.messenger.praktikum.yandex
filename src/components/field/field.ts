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
		const { name, placeholder, validate } = this.props;
		return `<div class="field">
					{{{Input modificator="${name}" validate="${validate}" type="text" name="${name}" ${
						placeholder ? `placeholder="${placeholder}"` : ''
					}
					}}}
				</div>`;
	}
}
