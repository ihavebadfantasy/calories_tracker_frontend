import {
  SET_CURRENT_MEAL,
  UPDATE_CURRENT_MEAL,
  CREATE_MEAL,
} from './types';
import { Api } from '../../api/Api';
import { CREATE_MEAL_URL, UPDATE_MEAL_URL } from '../../api/urls';

export const createMeal = (credentials) => {
  return async (dispatch) => {
    const res = await Api.$instance.post(CREATE_MEAL_URL, credentials);

    if (!res.status) {
      dispatch({
        type: CREATE_MEAL,
        payload: res.data.meal,
      });
    }

    return res;
  }
}
