import { ResourcesAPI } from '../api/resourcesAPI';
import { apiHasError } from '../utils/apiHasError';

const resourcesApi = new ResourcesAPI();

const getFileByPath = async (path: string) => {
	const response = await resourcesApi.GetFileByPath(path);
	if (apiHasError(response)) {
		throw Error(response.reason);
	}

	return response;
};

export { getFileByPath };
