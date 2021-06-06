import {
  SET_CURRENT_ACTIVITYL,
  UPDATE_CURRENT_ACTIVITY,
  CREATE_ACTIVITY,
  DELETE_ACTIVITY,
  FETCH_CALCULATED_ACTIVITIES,
} from './types';
import { Api } from '../../api/Api';
import {
  CREATE_ACTIVITY_URL,
  UPDATE_ACTIVITY_URL,
  DELETE_ACTIVITY_URL,
  GET_CALCULATED_ACTIVITIES_URL
} from '../../api/urls';
import makeUrl from '../../helpers/makeUrl';

export const fetchCalculatedActivities = () => {
  return async (dispatch) => {
    const res = await Api.$instance.get(GET_CALCULATED_ACTIVITIES_URL);

    if (!res.status) {
      dispatch({
        type: FETCH_CALCULATED_ACTIVITIES,
        payload: res.data.activities,
      });
    }

    return res;
  }
}

export const createActivity = (credentials) => {
  return async (dispatch) => {
    const res = await Api.$instance.post(CREATE_ACTIVITY_URL, credentials);

    if (!res.status) {
      dispatch({
        type: CREATE_ACTIVITY,
        payload: res.data.dailyActivity,
      });
    }

    return res;
  }
}

export const updateActivity = (credentials, id) => {
  return async (dispatch) => {
    const res = await Api.$instance.put(makeUrl(UPDATE_ACTIVITY_URL, { id }), credentials);

    if (!res.status) {
      dispatch({
        type: UPDATE_CURRENT_ACTIVITY,
        payload: res.data.dailyActivity,
      });
    }

    return res;
  }
}

export const deleteActivity = (id) => {
  return async (dispatch) => {
    const res = await Api.$instance.delete(makeUrl(DELETE_ACTIVITY_URL, { id }));

    if (!res.status) {
      dispatch({
        type: DELETE_ACTIVITY,
      });
    }

    return res;
  }
}
