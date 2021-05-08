import { SET_LANGUAGE, REGISTER_USER } from './types';
import userState from './state';

export const reducer = (state = userState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return {...state, tokens: action.payload, isAuth: true};
    case SET_LANGUAGE:
      return {...state, language: action.payload};
    default:
      return state;
  }
}
