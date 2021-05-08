import { FETCH_DAYS, SET_TODAY } from './types';
import { Api } from '../../api/Api';
import { GET_DAYS_URL } from '../../api/urls';

export const fetchDays = () => {
  return async (dispatch) => {
    const res = await Api.$instance.get(GET_DAYS_URL);

    if (!res.status) {
      dispatch({
        type: GET_DAYS_URL,
        payload: res.data.days,
      });
    }

    return res;
  }
}
