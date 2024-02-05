import Block, { EventsListType } from '../../core/Block';
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

	protected init(): void {
		this.events = {
			blur: this.props.events.blur,
		};
	}
	protected events: Partial<EventsListType> = {
		blur: this.props.events.blur,
	};
	protected render(): string {
		return `<input
					class='input__element input__element{{modificator}} {{#if isError}}input__error{{/if}}'
					type='{{type}}'
					name='{{name}}'
					{{#if id}} id="{{id}}" {{/if}}
					
					{{#if placeholder}} placeholder="{{placeholder}}"{{/if}}
					{{#if value}} value="{{value}}" {{/if}}
					{{#if readonly}} readonly {{/if}}
				/>`;
	}
}
