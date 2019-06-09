import { CREATE_CARD_LOADING, CREATE_CARD_FAILURE, CREATE_CARD_SUCCESS } from './actionTypes';

const initialState = {
  loading: false,
  errors: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CARD_LOADING:
      return {
        ...state,
        loading: true,
        errors: {},
      };

    case CREATE_CARD_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };

    case CREATE_CARD_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: {},
      };

    default:
      return state;
  }
};
