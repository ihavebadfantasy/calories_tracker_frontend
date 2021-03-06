import {
  SET_LANGUAGE,
  REGISTER_USER,
  GET_PROFILE,
  LOGIN_USER,
  CREATE_PROFILE,
  SET_IS_AUTH,
  SET_TOKENS,
} from './types';
import userState from './state';

export const reducer = (state = userState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return {...state, tokens: action.payload, isAuth: true};
    case LOGIN_USER:
      return {...state, tokens: action.payload, isAuth: true};
    case GET_PROFILE:
      return {...state, profile: action.payload};
    case CREATE_PROFILE:
      return {...state, profile: action.payload};
    case SET_LANGUAGE:
      return {...state, language: action.payload};
    case SET_IS_AUTH:
      return {...state, isAuth: action.payload};
    case SET_TOKENS:
      return {...state, tokens: action.payload};
    default:
      return state;
  }
}
