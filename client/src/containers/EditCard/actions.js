import axios from 'axios';

import {
  GET_CARD_SUCCESS,
  GET_CARD_LOADING,
  GET_CARD_FAILURE,
  EDIT_CARD_FAILURE,
  EDIT_CARD_LOADING,
  EDIT_CARD_SUCCESS,
} from './actionTypes';

export const getCardById = id => (dispatch) => {
  dispatch({
    type: GET_CARD_LOADING,
  });

  axios
    .get(`/api/cards/${id}`)
    .then((response) => {
      console.log(response.data.card);

      dispatch({ type: GET_CARD_SUCCESS, payload: response.data.card });
    })
    .catch((error) => {
      console.log(error.response);

      dispatch({ type: GET_CARD_FAILURE, payload: error.response.data.errors });
    });
};

export const updateData = (id, data, history) => (dispatch) => {
  dispatch({
    type: EDIT_CARD_LOADING,
  });

  if (data.imageFile) {
    const formData = new FormData();
    formData.append('image', data.imageFile);

    axios
      .put(`/api/cards/update/${id}`, { title: data.title, description: data.description })
      .then((response) => {
        axios
          .put(`/api/cards/update-image/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          })
          .then((res) => {
            dispatch({ type: EDIT_CARD_SUCCESS });

            history.push('/');
          })
          .catch((err) => {
            console.log(err.response);
          });
      })
      .catch((err) => {
        console.log(err.response);
      });
  } else {
    axios
      .put(`/api/cards/update/${id}`, { title: data.title, description: data.description })
      .then((response) => {
        dispatch({
          type: EDIT_CARD_SUCCESS,
        });

        history.push('/');
      })
      .catch((err) => {
        console.log(err.response);
      });
  }
};
