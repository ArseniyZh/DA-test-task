const _model_name = ':model_name'
const _model_id = ':model_id'

export const MODELS = '/models'
export const ModelListRoutePath = MODELS + `/list/${_model_name}/`
export const ModelCreateRoutePath = MODELS + '/create/' + _model_name + '/'
export const ModelEditRoutePath = MODELS + '/edit/' + _model_name + '/' + _model_id + '/'

export const getModelListUrl = (model_name) => {
	return ModelListRoutePath.replace(_model_name, model_name)
}

export const getModelCreateUrl = (model_name, fields) => {
	return ModelCreateRoutePath.replace(_model_name, model_name) + `?fields=${fields}`
};

export const getModelEditUrl = (model_name, model_id, fields, data) => {
	return ModelEditRoutePath.replace(_model_name, model_name).replace(_model_id, model_id) 
	+ `?fields=${fields}&data=${data}` 
}
