import axios from 'axios';

import { GET_CARD_SUCCESS, GET_CARD_LOADING, GET_CARD_FAILURE } from './actionTypes';

export const getCardById = id => (dispatch) => {
  dispatch({
    type: GET_CARD_LOADING,
  });

  axios
    .get(`/api/cards/${id}`)
    .then((response) => {
      console.log(response);

      dispatch({ type: GET_CARD_SUCCESS });
    })
    .catch((error) => {
      console.log(error);

      dispatch({ type: GET_CARD_FAILURE });
    });
};
