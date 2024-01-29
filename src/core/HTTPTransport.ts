import constants from '../constants';
enum METHOD {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	PATCH = 'PATCH',
	DELETE = 'DELETE',
}

type Options = {
	method: METHOD;
	data?: any;
	timeout?: number;
	headers?: Record<string, string>;
};

type queryData = Record<string, string>;
type OptionsWithoutMethod = Omit<Options, 'method'>;

function queryStringify(data: queryData) {
	const keys = Object.keys(data);
	return keys.reduce((result, key, index) => {
		return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
	}, '?');
}

type request = (url: string, options?: OptionsWithoutMethod) => Promise<XMLHttpRequest>;

export class HTTPTransport {
	#apiUrl: string = '';

	constructor(url: string) {
		this.#apiUrl = `${constants.HOST}${url}`;
	}
	get(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
		if (options.data) {
			url = queryStringify(options.data);
		}
		return this.request(`${this.#apiUrl}${url}`, {
			...options,
			method: METHOD.GET,
		});
	}

	post(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
		return this.request(`${this.#apiUrl}${url}`, { ...options, method: METHOD.POST }, options.timeout);
	}

	put(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
		return this.request(`${this.#apiUrl}${url}`, { ...options, method: METHOD.PUT }, options.timeout);
	}

	delete(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
		return this.request(`${this.#apiUrl}${url}`, { ...options, method: METHOD.DELETE }, options.timeout);
	}

	async request(url: string, options: Options = { method: METHOD.GET }, timeout = 5000): Promise<XMLHttpRequest> {
		const { headers = { 'Content-Type': 'application/json' }, method, data } = options;

		return new Promise((resolve, reject) => {
			if (!method) {
				reject('No method');
				return;
			}

			const xhr = new XMLHttpRequest();
			xhr.open(method, url);

			Object.entries(headers).forEach(([key, value]) => {
				xhr.setRequestHeader(key, value);
			});

			xhr.withCredentials = true;
			xhr.responseType = 'json';

			xhr.onload = function () {
				resolve(xhr);
			};
			xhr.onabort = reject;
			xhr.onerror = reject;

			xhr.timeout = timeout;
			xhr.ontimeout = reject;

			if (method === METHOD.GET || !data) {
				xhr.send();
			} else {
				xhr.send(data ? JSON.stringify(data) : null);
			}
		});
	}
}
