import { SET_LANGUAGE, REGISTER_USER } from './types';
import { Api } from '../../api/Api';
import { REGISTER_URL } from '../../api/urls';
import setAccessTokens from '../../helpers/setAccessTokens';

export const registerUser = (credentials) => {
  return async (dispatch) => {
    const res = await Api.$instance.post(REGISTER_URL, credentials);

    if (!res.status) {
      setAccessTokens(res.data.accessToken, res.data.refreshToken);
      dispatch({
        type: REGISTER_USER,
        payload: res.data,
      });
    }

    return res;
  }
}

export const setLanguage = (language) => {
  Api.$instance.setLanguage(language);

  return {
    type: SET_LANGUAGE,
    payload: language,
  }
}
