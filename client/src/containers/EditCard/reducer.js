import {
  GET_CARD_LOADING,
  GET_CARD_SUCCESS,
  GET_CARD_FAILURE,
  EDIT_CARD_LOADING,
  EDIT_CARD_SUCCESS,
  EDIT_CARD_FAILURE,
} from './actionTypes';

const initialState = {
  getCardLoading: false,
  getCardError: null,
  card: {},

  editCardLoading: false,
  errors: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CARD_LOADING:
      return {
        ...state,
        getCardLoading: true,
        getCardError: null,
      };

    case GET_CARD_SUCCESS:
      return {
        ...state,
        getCardLoading: false,
        card: action.payload,
      };

    case GET_CARD_FAILURE: {
      return {
        ...state,
        getCardLoading: false,
        getCardError: action.payload,
      };
    }

    case EDIT_CARD_LOADING:
      return {
        ...state,
        editCardLoading: true,
        errors: {},
      };

    case EDIT_CARD_SUCCESS:
      return {
        ...state,
        editCardLoading: false,
        errors: {},
      };

    case EDIT_CARD_FAILURE:
      return {
        ...state,
        errors: { ...state.errors, ...action.payload },
      };

    default:
      return state;
  }
};
