import activitiesState from './state';
import {
  SET_CURRENT_ACTIVITY,
  UPDATE_CURRENT_ACTIVITY,
  CREATE_ACTIVITY,
  DELETE_ACTIVITY,
  FETCH_CALCULATED_ACTIVITIES,
} from './types';

export const reducer = (state = activitiesState, action) => {
  switch (action.type) {
    case SET_CURRENT_ACTIVITY:
      return {...state, currentActivity: action.payload};
    case UPDATE_CURRENT_ACTIVITY:
      return {...state, currentActivity: action.payload};
    case CREATE_ACTIVITY:
      return {...state, currentActivity: action.payload};
    case DELETE_ACTIVITY:
      return {...state, currentActivity: null};
    case FETCH_CALCULATED_ACTIVITIES:
      return {...state, calculatedActivities: action.payload};
    default:
      return state;
  }
}
