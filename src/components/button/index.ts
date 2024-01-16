import './button.css';
import larger from '../../assets/larger.svg';
import Handlebars from 'handlebars';

export { Button as default } from './button';

Handlebars.registerHelper('svg', () => {
	return {
		larger,
	};
});
