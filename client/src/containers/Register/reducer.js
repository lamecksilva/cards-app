import { REGISTER_USER_LOADING, REGISTER_USER_FAILURE } from './actionsTypes';

const initialState = {
  errors: {},
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_LOADING:
      return {
        ...state,
        loading: true,
      };

    case REGISTER_USER_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };

    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: {},
      };

    default:
      return state;
  }
};
