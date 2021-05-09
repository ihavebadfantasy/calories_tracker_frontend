import mealsState from './state';
import {
  SET_CURRENT_MEAL,
  UPDATE_CURRENT_MEAL,
  CREATE_MEAL,
} from './types';

export const reducer = (state = mealsState, action) => {
  switch (action.type) {
    case SET_CURRENT_MEAL:
      return {...state, currentMeal: action.payload};
    case UPDATE_CURRENT_MEAL:
      return {...state, currentMeal: action.payload};
    case CREATE_MEAL:
      return {...state, currentMeal: action.payload};
    default:
      return state;
  }
}
