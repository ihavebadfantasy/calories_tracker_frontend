import { LOAD_INITIAL_APP_DATA } from './types';
import { setLocation, setLanguage } from '../user/actions';

export const loadInitialAppData = () => {
  return async (dispatch) => {
    dispatch(setLanguage(localStorage.getItem('i18nextLng')));
    await dispatch(setLocation());

    dispatch({
      type: LOAD_INITIAL_APP_DATA,
    });
  }
}
