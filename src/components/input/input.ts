import Block from '../../core/Block';
import { Props } from '../../core/core-env';

export class Input extends Block<Props> {
	constructor(props: Props) {
		super({
			...props,
			events: {
				blur: props.onBlur,
			},
		});
	}
	protected render(): string {
		return `<input
					class='input__element input__element{{modificator}} {{#if isError}}input__error{{/if}}'
					type={{type}}
					name={{name}}
					
					placeholder=""
					{{#if value}} value="{{value}}" {{/if}}
					{{#if readonly}} readonly {{/if}}
				/>`;
	}
}
