import axios from 'axios';

import { GET_CARDS_SUCCESS } from './actionTypes';

export const getCards = () => (dispatch) => {
  axios
    .get('/api/cards')
    .then((response) => {
      console.log(response);
      dispatch({
        type: GET_CARDS_SUCCESS,
        payload: response.data,
      });
    })
    .catch(error => console.log(error));
};
