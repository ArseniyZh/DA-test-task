import { Request, BASE_URL, POST } from ".";

export const USER_BASE_URL = BASE_URL + '/user/';
export const USER_REGISTRATION_URL = USER_BASE_URL + 'register/'
export const USER_LOGIN_URL = USER_BASE_URL + 'login/'


/**
 * Запрос для регистрации
 *
 * @param {map} data - {username: string, password: string}
 */
export const userRegistrationRequest = (data) => {
	return Request.send({method: POST, url: USER_REGISTRATION_URL, data: data});
};

/**
 * Запрос для логина
 *
 * @param {map} data - {email: string, password: string}
 */
export const userLoginRequest = (data) => {
	return Request.send({method: POST, url: USER_LOGIN_URL, data: data});
};
