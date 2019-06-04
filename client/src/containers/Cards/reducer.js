import { GET_CARDS_SUCCESS, GET_CARDS_LOADING, GET_CARDS_ERROR } from './actionTypes';

const initialState = {
  cards: [],
  loading: false,
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CARDS_LOADING:
      return {
        ...state,
        loading: true,
      };

    case GET_CARDS_SUCCESS:
      return {
        ...state,
        cards: action.payload.cards,
        loading: false,
        error: false,
      };

    case GET_CARDS_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };

    default:
      return state;
  }
};
