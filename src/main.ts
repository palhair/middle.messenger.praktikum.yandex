import Handlebars from 'handlebars';
import './style.css';
import * as Components from './components';
import * as handlebarsHelpers from './handlebarsHelpers';
import { navigate } from './core/navigate';
import { registerComponent } from './core/registerComponent';

Object.entries(Components).forEach(([name, component]) => {
	registerComponent(name, component);
});

Object.entries(handlebarsHelpers).forEach(([name, component]) => {
	Handlebars.registerPartial(name, component);
});

document.addEventListener('DOMContentLoaded', () => navigate('profile'));
