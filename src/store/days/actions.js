import { FETCH_DAYS, SET_TODAY, UPDATE_TODAY } from './types';
import { Api } from '../../api/Api';
import { GET_DAYS_URL, UPDATE_DAY_URL, CREATE_TODAY_URL } from '../../api/urls';
import { DateTime } from 'luxon';
import makeUrl from '../../helpers/makeUrl';

export const fetchDays = () => {
  return async (dispatch) => {
    const res = await Api.$instance.get(GET_DAYS_URL);

    if (!res.status) {
      dispatch(findAndSetToday(res.data.days));
      dispatch({
        type: FETCH_DAYS,
        payload: res.data.days,
      });
    }

    return res;
  }
}

export const createToday = () => {
  return async (dispatch) => {
    const res = await Api.$instance.post(CREATE_TODAY_URL);
    if (!res.status) {
      await dispatch(fetchDays());
    }

    return res;
  }
}

export const updateToday = (credentials, id) => {
  return async (dispatch) => {
    const res = await Api.$instance.put(makeUrl(UPDATE_DAY_URL, { id }), credentials);

    if (!res.status) {
      dispatch({
        type: UPDATE_TODAY,
        payload: res.data.day,
      });
    }

    return res;
  }
}

export const findAndSetToday = (days) => {
  let now = DateTime.now().toString();
  now = now.slice(0, now.indexOf('T'));

  const todayArr = days.filter((day) => {
    const createdAt = day.createdAt.slice(0, day.createdAt.indexOf('T'));

    return createdAt === now;
  });

  let today = null;
  if (todayArr.length > 0) {
    today = todayArr[0];
  }

  return {
    type: SET_TODAY,
    payload: today,
  }
}
