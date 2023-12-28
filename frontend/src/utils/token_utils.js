import cookie from 'react-cookies'
import { TOKEN_NAME } from "../constants"

export const checkTokenExist = () => {
	if (cookie.load(TOKEN_NAME)) {
		return true;
	} return false;
};
