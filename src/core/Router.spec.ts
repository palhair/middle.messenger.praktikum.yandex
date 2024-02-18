import { expect } from 'chai';
import { Router } from './Router';
import Block from './Block';
import { registerComponent } from './registerComponent';
import { StatusMessage } from '../components';

class Page extends Block<object> {
	protected render(): string {
		return `<div id='testElement'>test</div>`;
	}
}

registerComponent('StatusMessage', StatusMessage);

describe('Router', () => {
	const testUrl = '/test';
	const lastPageInHistory = '/last';

	beforeEach(() => {
		Router.use(testUrl, Page);
		Router.use(lastPageInHistory, Page);
	});

	it('Router добавляет роут c нужным адресом', () => {
		const isRoute = Router.routes[0].match('/test');
		expect(isRoute).to.be.true;
	});

	it('Router переходит на страницу с указанным адресом', () => {
		Router.go(testUrl);
		const currenHistoryState = history.state;

		expect(currenHistoryState).to.have.property('page', testUrl);
	});

	it('Router должен уметь переходить на предыдущую страницу', (done) => {
		window.addEventListener('popstate', onPopstate);

		Router.go(testUrl);
		Router.go(lastPageInHistory);
		Router.back();

		function onPopstate() {
			expect(history.state).to.have.property('page', testUrl);
			done();
		}
	});

	it('Router должен рендерить странцу соответствующую текущему урл', async () => {
		history.pushState({ page: testUrl }, testUrl, testUrl);
		Router.start();
		const element = document.querySelector('#testElement');
		expect(element?.innerHTML).to.be.eq('test');
	});

	it('Router должен рендерить страницу 404 если нет соотвтсвующей урл страницы ', async () => {
		history.pushState({ page: 'undefindetUrl' }, 'undefindetUrl', 'undefindetUrl');
		Router.start();
		const element = document.querySelector('.status-message__message');
		expect(element?.innerHTML).to.be.eq('Не туда попали');
	});
});
