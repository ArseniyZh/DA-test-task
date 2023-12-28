import { Request, BASE_URL_ADMIN, GET, POST, DELETE, PATCH } from '.';


export const allModelsListRequest = () => {
	const url = BASE_URL_ADMIN + 'list/all_names/'
	return Request.send({method: GET, url: url});
};

export const modelListRequest = (model_name) => {
	const url = BASE_URL_ADMIN + `list/${model_name}/`
	return Request.send({method: GET, url: url})
};

export const modelsCreateRequest = (model_name, data) => {
	const url = BASE_URL_ADMIN + `create/${model_name}`
	return Request.send({method: POST, url: url, data: data})
}

export const modelsEditRequest = (model_name, model_id, data) => {
	const url = BASE_URL_ADMIN + `edit/${model_name}/${model_id}/`
	return Request.send({method: PATCH, url: url, data: data})
}

export const modelsDeleteRequest = (model_name, model_id) => {
	const url = BASE_URL_ADMIN + `delete/${model_name}/${model_id}/`
	return Request.send({method: DELETE, url: url})
}
