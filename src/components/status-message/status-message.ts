import Block from '../../core/Block';
import { Props } from '../../core/core-env';

export class StatusMessage extends Block<Props> {
	protected render(): string {
		return `<div class="status-message">
					<div class="status-message__status-cod">{{statusCod}}</div>
					<div class="status-message__message">{{message}}</div>
					<div class="status-message__back-botton">{{{ Button type="secondary" label='Назад к чатам'}}}</div>
				</div>`;
	}
}
