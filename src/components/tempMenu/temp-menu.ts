import Block from '../../core/Block';
import { Props } from '../../core/core-env';

export class TempMenu extends Block<Props> {
	protected init(): void {
		this.props.events = {
			click: this.props.onClick,
		};
	}
	protected render(): string {
		return `<nav class='temp-nav'>
                    <ul>
                        <li><a href='' page='login'>Вход</a></li>
                        <li><a href='' page='signin'>Регистрация</a></li>
                        <li><a href='' page='chatPage'>Чат</a></li>
                        <li><a href='' page='profile'>Профиль</a></li>
                        <li><a href='' page='errorPage'>500</a></li>
                        <li><a href='' page='notFoundPage'>404</a></li>
                
                    </ul>
                
                </nav>
                `;
	}
}
