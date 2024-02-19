import { JSDOM } from 'jsdom';

// import * as Components from './src/components';
// import { registerComponent } from './src/core/registerComponent';

// Object.entries(Components).forEach(([componentName, component]) => registerComponent(componentName, component));

const jsdom = new JSDOM('<body id="app"></body>', {
	url: 'http://test.ru/',
});

global.window = jsdom.window;
global.document = jsdom.window.document;
global.Node = jsdom.window.Node;
global.MouseEvent = jsdom.window.MouseEvent;
global.history = jsdom.window.history;
global.location = jsdom.window.location;
global.XMLHttpRequest = jsdom.window.XMLHttpRequest;
