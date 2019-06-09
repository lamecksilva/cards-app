import { LOGIN_USER_LOADING, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS } from './actionTypes';
import isEmpty from '../../utils/is-empty';

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  errors: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_LOADING:
      return {
        ...state,
        loading: true,
        errors: {},
      };

    case LOGIN_USER_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };

    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: {},
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };

    default:
      return state;
  }
};
