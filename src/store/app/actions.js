import { LOAD_INITIAL_APP_DATA } from './types';
import { setLanguage } from '../user/actions';

export const loadInitialAppData = () => {
  return async (dispatch) => {
    dispatch(setLanguage(localStorage.getItem('i18nextLng')));

    dispatch({
      type: LOAD_INITIAL_APP_DATA,
    });
  }
}
