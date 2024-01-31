import Block from '../../core/Block';

export interface MenuItemProps {
	src: string;
	alt: string;
	label: string;
	onClick: (e: Event) => void;
}

export class MenuItem extends Block<MenuItemProps> {
	protected init(): void {
		this.events = {
			click: this.props.onClick,
		};
	}
	render() {
		return `<a href='' class='menu-item'>
					{{{Avatar src=src size='middle' alt=alt }}}
					{{{Title type='span' label=label }}}
				</a>
				`;
	}
}
