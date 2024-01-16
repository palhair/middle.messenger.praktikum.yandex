import Block from '../../core/Block';
import { Props } from '../../core/core-env';

export class Avatar extends Block<Props> {
	protected render(): string {
		return `<div class='avatar'>
					<img class='avatar_{{size}}' src={{src}} alt={{alt}} />
				</div>`;
	}
}
