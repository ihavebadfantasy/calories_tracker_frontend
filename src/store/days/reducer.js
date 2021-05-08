import daysState from './state';
import { FETCH_DAYS, SET_TODAY } from './types';

export const reducer = (state = daysState, action) => {
  switch (action.type) {
    case FETCH_DAYS:
      return {...state, days: action.payload};
    case SET_TODAY:
      return {...state, today: action.payload};
    default:
      return state;
  }
}
