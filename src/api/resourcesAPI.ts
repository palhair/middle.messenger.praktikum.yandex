import { HTTPTransport } from '../core/HTTPTransport';
import { APIError } from './type';

const resourcesApi = new HTTPTransport('/resources');

export class ResourcesAPI {
	async GetFileByPath(path: string): Promise<APIError> {
		return resourcesApi
			.get(`/${path}`)
			.then((res) => res.response)
			.catch((err) => err);
	}
}
