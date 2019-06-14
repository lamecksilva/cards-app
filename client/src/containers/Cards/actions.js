import axios from 'axios';

import { GET_CARDS_SUCCESS, GET_CARDS_ERROR, GET_CARDS_LOADING } from './actionTypes';

export const getCards = () => (dispatch) => {
  dispatch({
    type: GET_CARDS_LOADING,
  });

  axios
    .get('/api/cards')
    .then((response) => {
      // console.log(response);
      dispatch({
        type: GET_CARDS_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log(error.response);

      dispatch({
        type: GET_CARDS_ERROR,
      });
    });
};
