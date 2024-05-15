import constants from '../constants';
export enum METHOD {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	PATCH = 'PATCH',
	DELETE = 'DELETE',
}

type Options = {
	method: METHOD;
	data?: QueryData;
	timeout?: number;
	headers?: Record<string, string>;
};

type QueryData = ObjectData | FormData;
type ObjectData = Record<string, unknown>;
type OptionsWithoutMethod = Omit<Options, 'method'>;

function queryStringify(data: ObjectData) {
	const keys = Object.keys(data);
	return keys.reduce((result, key, index) => {
		return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
	}, '?');
}

type Request = (url: string, options?: OptionsWithoutMethod) => Promise<XMLHttpRequest>;

export class HTTPTransport {
	#apiUrl: string = '';

	constructor(url: string) {
		this.#apiUrl = `${constants.HOST}${url}`;
	}
	get: Request = (url, options = {}) => {
		if (options.data) {
			url = queryStringify(options.data as ObjectData);
		}
		return this.request(`${this.#apiUrl}${url}`, {
			...options,
			method: METHOD.GET,
		});
	};

	post: Request = (url, options = {}) => {
		return this.request(`${this.#apiUrl}${url}`, { ...options, method: METHOD.POST }, options.timeout);
	};

	put: Request = (url, options = {}) => {
		return this.request(`${this.#apiUrl}${url}`, { ...options, method: METHOD.PUT }, options.timeout);
	};

	delete: Request = (url, options = {}) => {
		return this.request(`${this.#apiUrl}${url}`, { ...options, method: METHOD.DELETE }, options.timeout);
	};

	async request(url: string, options: Options = { method: METHOD.GET }, timeout = 5000): Promise<XMLHttpRequest> {
		const { headers = {}, method, data } = options;

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
			} else if (data instanceof FormData) {
				xhr.send(data);
			} else {
				xhr.setRequestHeader('Content-Type', 'application/json');
				xhr.send(data ? JSON.stringify(data) : null);
			}
		});
	}
}
