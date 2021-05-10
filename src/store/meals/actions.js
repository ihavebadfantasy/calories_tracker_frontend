import {
  SET_CURRENT_MEAL,
  UPDATE_CURRENT_MEAL,
  CREATE_MEAL,
  DELETE_MEAL,
} from './types';
import { Api } from '../../api/Api';
import {
  CREATE_MEAL_URL,
  UPDATE_MEAL_URL,
  DELETE_MEAL_URL,
} from '../../api/urls';
import makeUrl from '../../helpers/makeUrl';

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

export const updateMeal = (credentials, id) => {
  return async (dispatch) => {
    const res = await Api.$instance.put(makeUrl(UPDATE_MEAL_URL, { id }), credentials);

    if (!res.status) {
      dispatch({
        type: UPDATE_CURRENT_MEAL,
        payload: res.data.meal,
      });
    }

    return res;
  }
}

export const deleteMeal = (id) => {
  return async (dispatch) => {
    const res = await Api.$instance.delete(makeUrl(DELETE_MEAL_URL, { id }));

    if (!res.status) {
      dispatch({
        type: DELETE_MEAL,
      });
    }

    return res;
  }
}
