import { GET_CARDS_SUCCESS } from './actionTypes';

const initialState = {
  cards: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CARDS_SUCCESS:
      return {
        ...state,
        cards: action.payload.cards,
      };

    default:
      return state;
  }
};
