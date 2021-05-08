import {
  SET_LANGUAGE,
  REGISTER_USER,
  GET_PROFILE,
  LOGIN_USER,
  CREATE_PROFILE,
} from './types';
import { Api } from '../../api/Api';
import {
  REGISTER_URL,
  GET_USER_PROFILE_URL,
  LOGIN_URL,
  CREATE_PROFILE_URL,
} from '../../api/urls';
import setAccessTokens from '../../helpers/setAccessTokens';

export const registerUser = (credentials) => {
  return async (dispatch) => {
    const res = await Api.$instance.post(REGISTER_URL, credentials);

    if (!res.status) {
      setAccessTokens(res.data.accessToken, res.data.refreshToken);
      await dispatch(fetchUserProfile());

      dispatch({
        type: REGISTER_USER,
        payload: res.data,
      });
    }

    return res;
  }
}

export const loginUser = (credentials) => {
  return async (dispatch) => {
    const res = await Api.$instance.post(LOGIN_URL, credentials);

    if (!res.status) {
      setAccessTokens(res.data.accessToken, res.data.refreshToken);
      await dispatch(fetchUserProfile());

      dispatch({
        type: LOGIN_USER,
        payload: res.data,
      });
    }

    return res;
  }
}

export const createUserProfile = (credentials) => {
  return async (dispatch) => {
    const res = await Api.$instance.post(CREATE_PROFILE_URL, credentials);

    if (!res.status) {
      dispatch({
        type: CREATE_PROFILE,
        payload: res.data.user,
      });
    }

    return res;
  }
}

export const fetchUserProfile = () => {
  return async (dispatch) => {
    const res = await Api.$instance.get(GET_USER_PROFILE_URL);

    if (!res.status) {
      dispatch({
        type: GET_PROFILE,
        payload: res.data.user,
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
