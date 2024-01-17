import profile from './profile.hbs?raw';
import Block from '../../core/Block';
import arrow from '../../assets/arrow.svg';
import defaultAvatar from '../../assets/avatar.png';
import { personalData } from '.';

type Props = Record<string, unknown>;

export class ProfilePage extends Block<Props> {
	constructor(props: Props) {
		super({
			...props,

			onLogin: (event: Event) => {
				event.preventDefault();
			},

			arrow,
			defaultAvatar,
			personalData,
		});
	}

	protected render(): string {
		console.log(this.props.reds);
		return profile;
	}
}
