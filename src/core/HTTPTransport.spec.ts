import sinon, { SinonFakeXMLHttpRequest } from 'sinon';
import { HTTPTransport } from './HTTPTransport';
import { expect } from 'chai';
import constants from '../constants';

describe.only('HttpTransport', () => {
	const http = new HTTPTransport('/test');
	let requests: SinonFakeXMLHttpRequest[] = [];
	let xhr: sinon.SinonFakeXMLHttpRequestStatic;

	beforeEach(() => {
		xhr = sinon.useFakeXMLHttpRequest();
		xhr.onCreate = (xhr) => {
			requests.push(xhr);
		};
	});

	afterEach(() => {
		xhr.restore();
		requests = [];
	});
	it('HttpTransport GET правильно подставляет заголовки из data', async () => {
		http.get('', { data: { a: '1', b: '22' } });

		const expectedUrl = `${constants.HOST}/test?a=1&b=22`;

		expect(requests[0].url).to.be.eq(expectedUrl);
	});

	it('HttpTransport подставляет GET метод запроса', async () => {
		http.get('');

		expect(requests[0].method).to.be.eq('GET');
	});

	it('HttpTransport подставляет остальные методы запроса', async () => {
		http.post('');

		expect(requests[0].method).to.be.eq('POST');
	});

	it('HttpTransport правильно подставляет заголовки запроса', async () => {
		const headers = { 'Content-Language': 'en-US' };

		http.post('', { headers });

		expect(requests[0].requestHeaders).to.include(headers);
	});

	it('HttpTransport правильно подставляет тело запроса', async () => {
		const data = { key: 'value' };
		const reqData = JSON.stringify(data);

		http.post('', { data });

		expect(requests[0].requestBody).to.be.eq(reqData);
	});

	it('HttpTransport правильно подставляет formData в тело запроса', async () => {
		const formData = new FormData();

		http.post('', { data: formData });

		expect(requests[0].requestBody).to.eq(formData);
	});
});
