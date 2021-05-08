import { LOAD_INITIAL_APP_DATA } from './types';
import { setLanguage, fetchUserProfile, setIsAuth, setTokens } from '../user/actions';
import setAccessTokens from '../../helpers/setAccessTokens';

export const loadInitialAppData = () => {
  return async (dispatch) => {
    dispatch(setLanguage(localStorage.getItem('i18nextLng')));

    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (accessToken && refreshToken) {
      setAccessTokens(accessToken, refreshToken);
      dispatch(setTokens({ accessToken, refreshToken }));
      dispatch(setIsAuth(true));
      await dispatch(fetchUserProfile());
    }

    dispatch({
      type: LOAD_INITIAL_APP_DATA,
    });
  }
}
