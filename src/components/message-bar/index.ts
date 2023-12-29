import clip from '../../assets/clip.svg';
import arrow from '../../assets/arrow.svg';
import Handlebars from 'handlebars';

export { default as MessageBar } from './message-bar.hbs?raw';

Handlebars.registerHelper('clip', () => {
	return {
		src: clip,
		withIcon: true,
		type: 'icon',
		alt: 'Прикрепить файл',
	};
});
Handlebars.registerHelper('arrow', () => {
	return {
		src: arrow,
		withIcon: true,
		type: 'icon',
		alt: 'Отправить',
	};
});
