import profile from './profile.hbs?raw';
import Block from '../../core/Block';
import * as validators from '../../utils/validators';
import { InputField } from '../../components';
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
				console.log(this.refs.data.refs.phone.value());
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
