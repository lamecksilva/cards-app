import { GET_CARD_LOADING, GET_CARD_SUCCESS, GET_CARD_FAILURE } from './actionTypes';

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
      };

    case GET_CARD_SUCCESS:
      return {
        ...state,
        card: action.payload,
      };

    case GET_CARD_FAILURE: {
      return {
        ...state,
        getCardError: action.payload,
      };
    }

    default:
      return state;
  }
};
