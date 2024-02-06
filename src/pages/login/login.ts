import loginPage from './login.hbs?raw';
import Block from '../../core/Block';

import { TProps } from '../../core/core-env';
import { initApp } from '../../services/initApp';

export interface IProps extends TProps {}

export class LoginPage extends Block<IProps> {
	constructor(props: IProps) {
		super({
			...props,
		});
	}

	protected async init(): Promise<void> {
		await initApp();
	}

	protected render(): string {
		return loginPage;
	}
}
