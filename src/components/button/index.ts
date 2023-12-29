import larger from '../../assets/larger.svg';
import Handlebars from 'handlebars';

export { default as Button } from './button.hbs?raw';

Handlebars.registerHelper('svg', () => {
	return {
		larger,
	};
});
